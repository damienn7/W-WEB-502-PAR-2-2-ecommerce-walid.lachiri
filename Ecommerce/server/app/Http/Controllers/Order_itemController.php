<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order_item;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ArticleController;

class Order_itemController extends Controller
{

    public function index(Request $request)
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

public function showByOrderId($id)
{
    return DB::table('order_items')
    ->select('*', 'items.id as idefix', 'order_items.id as asterix',)     
    ->join('orders', 'orders.id', '=', 'order_items.order_id')
    ->join('items', 'items.id', '=', 'order_items.item_id')
    ->where('order_id', '=', $id)
    ->orderBy('order_items.created_at', 'desc')
    ->get();
}

    public function countItem($id){
        $quantity = DB::table('order_items')
        ->select(DB::raw('sum(quantity) as count'))
        ->where('order_id','=',$id)
        ->get(); 

        return response()->json([         
            "message" => "nombre d'items dans le panier",         
             "quantity"=> $quantity,       
        ], 201);  
    }

function create(Request $request, $order = [], $quantity = ""){

    foreach ($order as $key => $value) {
        $array_key=$key;
    }
    
    if ($order === []) {
        $article = new Order_item;  
        $article->order_id = $request->order_id;   
        $article->item_id = $request->item_id; 
        $order_id = $request->order_id;
        $item_id = $request->item_id;
    } else {
        $article = new Order_item;
        $article->order_id = $order->id;
        $article->item_id = $request->item_id;
        $order_id = $order->id;
        $item_id = $request->item_id;
    }

    // incrémentation de la quantité si la ligne existe dans la table order_items
    if ($array_key === 0) {
        $order_item = DB::table('order_items')
        ->where('order_id', '=', $order[0]->id)
        ->where('item_id',"=",$request->item_id)
        ->get();
    } else {
        $order_item = DB::table('order_items')
        ->where('order_id', '=', $order->id)
        ->where('item_id',"=",$request->item_id)
        ->get();
    }

    if ($quantity === "") {        
        if (count($order_item)>0) {
            foreach ($order_item as $key => $value) {
                DB::table('order_items')->where('id', '=', $value->id)->increment('quantity');
            }
            $article->quantity =count($order_item)+1;
            $article->save();     
        } else {
            $article->quantity =1;  
            $article->unit_price = $request->unit_price;
            $article->save();
        }
    } else {
        if (count($order_item)>=1) {
            for ($i=0; $i < $quantity; $i++) { 
                foreach ($order_item as $key => $value) {
                    DB::table('order_items')->where('id', '=', $value->id)->increment('quantity');
                }
            }
        }else{
            $article->quantity = $quantity;
            $article->unit_price = $request->unit_price;
            $article->save();
        }

    }
    
    //mettre à jour le stock de l'article
    $item = DB::table('items')
    ->where('id', '=', $request->item_id)
    ->get();

    if ($item[0]->stock > 0) {
        DB::table('items')->where('id', '=', $item[0]->id)->decrement('stock');
    }

    return response()->json([         
          "message" => "creation de la commande reussi",         
           "articles"=> $article,       
      ], 201);  
}



    function update(Request $request, $id)
    {
        $article = Order_item::findOrFail($id);
        $article->update($request->all());
 
        return response()->json($article, 200);
        
    }

    public function destroy($id)
    {
        $article = Order_item::findOrFail($id);
        $article->delete();
        $maxId = DB::table('order_items')->max('id');
        DB::statement('ALTER TABLE order_items AUTO_INCREMENT=' . intval($maxId + 1) . ';');
        return response()->json(['message' => 'commande supprimée correctement']);
    }
}