<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order_item;

class Order_itemController extends Controller
{

    public function indexOrder_item(Request $request)
    {
        $end = $request->input('_end');  
        $start = $request->input('_start');  
        $articles = Order_item::skip($start)->take($end-$start)->get();
        return response()
            ->json($articles, 200, ['X-Total-Count' => Order_item::count(), 'Access-Control-Expose-Headers' => 'X-Total-Count']);
    }
    public function showOrder($id)
{
    return Order_item::findOrFail($id);
}

function createOrder_item(Request $request){
    $article = new Order_item;  
    $article->order_id = $request->order_id;   
   $article->item_id = $request->item_id;  
   $article->quantity =$request->quantity;  
   $article->unit_price =$request->unit_price;  

   
   $article->save();                  
return response()->json([         
          "message" => "creation de la commande reussi",         
           "articles"=> $article,       
      ], 201);  
}



    function updateOrder_item(Request $request, $id)
    {
        $article = Order_item::findOrFail($id);
        $article->update($request->all());
        return response([
            'message' => 'mise a jour de la commande reussi',
            'donnees' => $article
        ]);
    }

    public function destroyOrder_item($id)
    {
        $article = Order_item::findOrFail($id);
        $article->delete();
        return response()->json(['message' => 'commande supprimée correctement']);
    }
}