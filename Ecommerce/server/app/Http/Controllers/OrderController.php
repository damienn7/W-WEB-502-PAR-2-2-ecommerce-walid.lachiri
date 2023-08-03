<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{

    public function indexOrder(Request $request)
    {
        $end = $request->input('_end');  
        $start = $request->input('_start');  
        $articles = Order::skip($start)->take($end-$start)->get();
        return response()
            ->json($articles, 200, ['X-Total-Count' => Order::count(), 'Access-Control-Expose-Headers' => 'X-Total-Count']);
    }
    public function showOrder($id)
{
    return Order::findOrFail($id);
}

function createOrder(Request $request){
    $article = new Order;  
    $article->user_id = $request->user_id;   
   $article->status = $request->status;  
   $article->delivery_address =$request->delivery_address;  
   
   $article->save();                  
return response()->json([         
          "message" => "creation de la commande reussi",         
           "articles"=> $article,       
      ], 201);  
}



    function updateOrder(Request $request, $id)
    {
        $article = Order::findOrFail($id);
        $article->update($request->all());
        return response([
            'message' => 'mise a jour de la commande reussi',
            'donnees' => $article
        ]);
    }

    public function destroyOrder($id)
    {
        $article = Order::findOrFail($id);
        $article->delete();
        return response()->json(['message' => 'commande supprimée correctement']);
    }
}