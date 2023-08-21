<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StripeController extends Controller
{
  public function checkout(
    $titre,
    $description,
    $prix,
    $stock,
    $views
  ) {
    \Stripe\Stripe::setApiKey(config('stripe.sk'));

    $session = \Stripe\Checkout\Session::create([
      'line_items' => [
        [
          'price_data' => [
            'currency' => 'usd',
            'product_data' => [
              'name' => $titre,
            ],
            'unit_amount' => $prix,
          ],
          'quantity' => $stock,
        ]
      ],
      'mode' => 'payment',
      'success_url' => "http://localhost:8000/success?titre=$titre&description=$description&prix=$prix&stock=$stock&views=$views&session_id={CHECKOUT_SESSION_ID}",
      'cancel_url' => 'http://localhost:8000/cancel',
    ]);
    return response()->json([
      "options" => [
        'nom' => $titre,
        'description' => $description,
        'prix' => $prix,
        'stock' => $stock,
        'views' => $views
      ],
      'url' => $session->url,
      // "paymentOptions" => [
      //   $request->numberOfCard,
      //   $request->expireCard,
      //   $request->cvc,
      // ]
    ], 201);
    // // return redirect()->away($session->url);
  }
  public function success(Request $request)
  {
    return response()->json([
      'titre' => $request->get('titre'),
      'description' => $request->get('description'),
      'prix' => $request->get('prix'),
      'stock' => $request->get('stock'),
      'views' => $request->get('views'),
      'session_id' => $request->get('session_id'),
    ]);
  }
}