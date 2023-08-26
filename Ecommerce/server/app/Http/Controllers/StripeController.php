<?php

namespace App\Http\Controllers;

use ArrayObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StripeController extends Controller
{
  public function checkout($token) {

    $options = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))));

    \Stripe\Stripe::setApiKey(config('stripe.sk'));

    $titre = urlencode($options->name);
    $description = urlencode($options->description);
    $prix = $options->price;
    $stock = $options->stock;
    $views = $options->views;
    $image = $options->image;

    try {
        $session = \Stripe\Checkout\Session::create([
      'line_items' => [
        [
          'price_data' => [
            'currency' => 'eur',
            'product_data' => [
              'name' => urldecode($titre),
            ],
            'unit_amount' => $prix,
          ],
          'quantity' => $stock,
        ]
      ],
      'mode' => 'payment',  
      'success_url' => "http://localhost:8000/success?token=$token",
      'cancel_url' => 'http://localhost:8000/cancel',
    ]);

    // // //a partir de  8
    return response()->json([
      'token' => $token,
      'options' => $options,
      'url' => $session->url,
      // "paymentOptions" => [
      //   $request->numberOfCard,
      //   $request->expireCard,
      //   $request->cvc,
      // ]
    ], 201);

    } catch (\Stripe\Exception\InvalidRequestException $ex) {
      echo $ex->getError()->message;
    }
    // // // return redirect()->away($session->url);
  }
  public function checkoutPanier($id){
    $panierUser = DB::table('orders')
        ->select('*', 'items.id as idefix', 'order_items.id as asterix', 'order_items.quantity as quantite')     
        ->join('order_items', 'orders.id', '=', 'order_items.order_id')
        ->join('items', 'items.id', '=', 'order_items.item_id')
        ->where('user_id', '=', $id)
        ->where('status','=','panier')
        ->orderBy('order_items.created_at', 'desc')
        ->get();
        $countrys = DB::table('orders')
        ->where('id', '=', $id)
        ->first();
        $country =$countrys->country;

    \Stripe\Stripe::setApiKey(config('stripe.sk'));

    $donnée_paniers = array_map(function ($post) {
        return $post; 
    }, $panierUser->all());

    


    $shipping_fee = DB::table('shipping_fee')
        ->where('country', '=', $country)
        ->first();





        $delivery_method = DB::table('orders')
        ->where('id', '=', $id)
        ->first();
    $delivery_prices = [
      "normal" => 0,
      "express" => 500,
      "day24" => 1000
    ];
    $delivery_price = $delivery_prices[$delivery_method->delivery_method];
    
    try {
      

        $session = \Stripe\Checkout\Session::create([
            'line_items' => array_merge(
                array_map(fn ($donnée_paniers) => [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => urldecode($donnée_paniers->name),
                        ],
                        'unit_amount' => $donnée_paniers->unit_price*100,
                    ],
                    'quantity' => $donnée_paniers->quantite,
                ], $donnée_paniers),
                [
                    [
                        'price_data' => [
                            'currency' => 'eur',
                            'product_data' => [
                                'name' => 'Frais de Livraison - '.$country ,
                            ],
                            'unit_amount' => $shipping_fee ? $shipping_fee->price * 100 : 0,
                        ],
                        'quantity' => 1,
                      ],
                      [  // ajout du frais de livraison en fonction de la méthode choisie
                        'price_data' => [
                            'currency' => 'eur',
                            'product_data' => [
                                'name' => 'Méthode de Livraison - ' . ucfirst($delivery_method->delivery_method),
                            ],
                            'unit_amount' => $delivery_price,
                        ],
                        'quantity' => 1,
                    ]
                    
                ]
                
            ),
            'mode' => 'payment',
            'success_url' => "http://localhost:8000/api/successPanier/$id",
            'cancel_url' => 'http://localhost:8000/cancel',
        ]);
    } catch (\Stripe\Exception\InvalidRequestException $ex) {
        echo $ex->getError()->message;
    }

    return response()->json([
        'panier_user' => $panierUser->count(),
        'donnée_panier' => $panierUser,
        'url' => $session->url
    ]);
}
  public function success(Request $request)
  {
    // $options = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $request->get('token'))[1]))));
    $token = $request->get('token');
    
    return redirect("http://localhost:3000/success/$token");
  }
  public function successPanier($id){

    // $panierUser = DB::table('orders')
    //     ->select('*', 'items.id as idefix', 'order_items.id as asterix',)     
    //     ->join('order_items', 'orders.id', '=', 'order_items.order_id')
    //     ->join('items', 'items.id', '=', 'order_items.item_id')
    //     ->where('user_id', '=', $id)
    //     ->where('status','=','panier')
    //     ->orderBy('order_items.created_at', 'desc')
    //     ->get();
      return redirect("http://localhost:3000/successBuyPanier/$id");
  }
}