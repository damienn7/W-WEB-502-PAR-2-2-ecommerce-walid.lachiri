<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
  public function success(Request $request)
  {
    // $options = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $request->get('token'))[1]))));
    $token = $request->get('token');
    
    return redirect("http://localhost:3000/success/$token");
  }
}