<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class StripeController extends Controller
{
    public function checkout($token) 
    {
        $options = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))));
        
        \Stripe\Stripe::setApiKey(config('stripe.sk'));

        $session = \Stripe\Checkout\Session::create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => urldecode($options->name),
                        ],
                        'unit_amount' => $options->price,
                    ],
                    'quantity' => $options->stock,
                ]
            ],
            'mode' => 'payment',
            'success_url' => "http://localhost:8000/success?token=$token",
            'cancel_url' => 'http://localhost:8000/cancel',
        ]);

        return response()->json([
            'token' => $token,
            'options' => $options,
            'url' => $session->url
        ], 201);
    }

    public function checkoutPanier($id)
    {
        $panierUser = DB::table('orders')
            ->select('*', 'items.id as idefix', 'order_items.id as asterix', 'order_items.quantity as quantite')
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->join('items', 'items.id', '=', 'order_items.item_id')
            ->where('user_id', '=', $id)
            ->where('status','=','panier')
            ->orderBy('order_items.created_at', 'desc')
            ->get();

        $country = DB::table('orders')->where('id', '=', $id)->first()->country;

        \Stripe\Stripe::setApiKey(config('stripe.sk'));

        $shipping_fee = DB::table('shipping_fee')->where('country', '=', $country)->first();
        $delivery_method = DB::table('orders')->where('id', '=', $id)->first();

        $delivery_prices = [
            "normal" => 0,
            "express" => 500,
            "day24" => 1000
        ];
        $delivery_price = $delivery_prices[$delivery_method->delivery_method];

        $session = \Stripe\Checkout\Session::create([
            'line_items' => array_merge(
                array_map(function($item) {
                    return [
                        'price_data' => [
                            'currency' => 'eur',
                            'product_data' => ['name' => urldecode($item->name)],
                            'unit_amount' => $item->unit_price * 100,
                        ],
                        'quantity' => $item->quantite,
                    ];
                }, $panierUser->all()),
                [
                    [
                        'price_data' => [
                            'currency' => 'eur',
                            'product_data' => ['name' => 'Frais de Livraison - ' . $country],
                            'unit_amount' => $shipping_fee ? $shipping_fee->price * 100 : 0,
                        ],
                        'quantity' => 1,
                    ],
                    [
                        'price_data' => [
                            'currency' => 'eur',
                            'product_data' => ['name' => 'Méthode de Livraison - ' . ucfirst($delivery_method->delivery_method)],
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

        return response()->json([
            'panier_user' => $panierUser->count(),
            'donnée_panier' => $panierUser,
            'url' => $session->url
        ]);
    }

    private function sendInvoiceEmail($userEmail, $username, $items, $total,$shipping_fee,$delivery_price,$country,$shipping_method)
    {
        $data = [
            'username' => $username,
            'items' => $items,
            'total' => $total,
            'shipping_fee'=>$shipping_fee,
            'country'=>$country,
            'delivery_price'=>$delivery_price,
            'shipping_method'=>$shipping_method


        ];

        Mail::send('emails.invoice', $data, function($message) use ($userEmail) {
            $message->to($userEmail)->subject('Votre Facture');
            $message->from('Htmamert@outlook.fr', 'Ht Mamert');
        });
    }

    public function success(Request $request)
    {
        $token = $request->get('token');
        $options = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))));
        $total = ($options->price* (1 - $options->promotion/100)) * $options->stock;
        $user = DB::table('users')->where('id', auth()->id())->first();
        $userEmail = $user->mail;
        $country = DB::table('orders')->where('id', auth()->id())->first()->country;
        $shipping_fee = DB::table('shipping_fee')->where('country', auth()->id())->first();
        $delivery_method = DB::table('orders')->where('id', auth()->id())->first();
        $delivery_prices = [
            "normal" => 0,
            "express" => 500,
            "day24" => 1000
        ];
        $delivery_price = $delivery_prices[$delivery_method->delivery_method];
        $this->sendInvoiceEmail($userEmail, $user->name, [$options], $total,$shipping_fee,$delivery_price,$country,$delivery_method);
        return redirect("http://localhost:3000/success/$token");
    }

    public function successPanier($id)
    {
        $panierUser = DB::table('orders')
            ->select('*', 'items.id as idefix', 'order_items.id as asterix', 'order_items.quantity as quantite')
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->join('items', 'items.id', '=', 'order_items.item_id')
            ->where('user_id', '=', $id)
            ->where('status','=','panier')
            ->orderBy('order_items.created_at', 'desc')
            ->get();
    
        $total = $panierUser->sum(function($item) {
            return $item->quantite * $item->unit_price;
        });
    
        $user = DB::table('users')->where('id', $id)->first();
        $userEmail = $user->mail;
        
        // Get the order details using the user's id
        $orderDetails = DB::table('orders')->where('user_id', $id)->orderBy('created_at','desc')->first();
        $country = $orderDetails->country;
        $order_id=$orderDetails->id;
        $delivery_method = $orderDetails->delivery_method;
    
        // Get the shipping fee for the given country
        $shipping_fee_obj = DB::table('shipping_fee')->where('country', $country)->first();
        $shipping_fee = $shipping_fee_obj ? $shipping_fee_obj->price : 0;
    
        $delivery_prices = [
            "normal" => 0,
            "express" => 5,
            "day24" => 10
        ];
        $delivery_price = isset($delivery_prices[$delivery_method]) ? $delivery_prices[$delivery_method] : 0;
    
        $this->sendInvoiceEmail($userEmail, $user->name, $panierUser, $total, $shipping_fee, $delivery_price, $country, $delivery_method);
        DB::table('orders')
        ->where('id','=', $order_id)
        ->where('status', '=','panier')
        ->update(['status' => 'payé']);
        return redirect("http://localhost:3000/successBuyPanier/$order_id");
        
    }
    
}
    