<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Http\Controllers\Order_itemController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class OrderController extends Controller
{

    public function index(Request $request)
    {
        $end = $request->input('_end');
        $start = $request->input('_start');
        $articles = Order::skip($start)->take($end - $start)->get();

        return response()
            ->json($articles, 200, ['X-Total-Count' => Order::count(), 'Access-Control-Expose-Headers' => 'X-Total-Count']);
    }
    public function order_user($userId)
    {
        $order = Order::where('user_id', $userId)
                ->where('user_id', $userId)
                ->first();
    
        if ($order) {
            return response()->json(['orderId' => $order->id, 'status' => $order->status, ]);
        }
    }

    public function show($id)
    {
        return Order::findOrFail($id);
    }

    public function showByUserId($id)
    {
        return DB::table('orders')
        ->select('*', 'items.id as idefix', 'order_items.id as asterix')
        ->join('order_items', 'orders.id', '=', 'order_items.order_id')
        ->join('items', 'items.id', '=', 'order_items.item_id')
        ->where('user_id', '=', $id)
        ->where('status', '=','panier')
        ->orderBy('order_items.created_at', 'desc')
        ->get();
    }
    public function showCommands($id)
    {
        return DB::table('orders')
        ->select('*', 'items.id as idefix', 'order_items.id as asterix')
        ->join('order_items', 'orders.id', '=', 'order_items.order_id')
        ->join('items', 'items.id', '=', 'order_items.item_id')
        ->where('orders.id', '=', $id)
        ->whereIn('status', ['payé', 'livré'])
        ->orderBy('order_items.created_at', 'desc')
        ->get();
    }
    public function showorder($id)
    {
        return DB::table('orders')
        ->select("id")
        ->where('user_id', '=', $id)
        ->where('status','=',"panier")
        ->get()->first();
    }
    public function overall($id)
    {
        return DB::table('orders')
        ->select('*')
        // ->join('order_items', 'orders.id', '=', 'order_items.order_id')
        // ->join('items', 'items.id', '=', 'order_items.item_id')
        ->where('user_id', '=', $id)
        ->whereIn('status', ['payé', 'livré'])
        ->get();
    }

    public function create(Request $request)
    {
        foreach ($request as $key => $value) {
            if ($key === "quantity") {
                $quantity = $request->quantity;
            }
        }

        $article = DB::table('orders')
        ->where('user_id', '=', $request->user_id)
        ->where('status','=','panier')
        ->get();
        Schema::disableForeignKeyConstraints();
        if (count($article)<1) {
            $article = new Order;
            $article->user_id = $request->user_id;
            $article->status = 'panier';
            $article->delivery_address = $request->delivery_address;
            $article->save();

            $article2 = DB::table('orders')
            ->where('user_id', '=', $request->user_id)
            ->where('status','=','panier')
            ->get();
            $order_item = new Order_itemController;
            if (isset($quantity)) {
                $order_item->create($request,$article2[0],$quantity);
            } else {
                $order_item->create($request,$article2[0]);
            }
            

        } else {

            $order_item = new Order_itemController;
            // $order_item->create($request,$article[0]);
            // return response()->json([
            //     "message" => "request",
            //     "request" => $request,
            // ], 201);
            if (isset($request->quantity)) {
                $order_item->create($request,$article[0],$request->quantity);
            } else {
                $order_item->create($request,$article[0]);
            }
        }
        Schema::enableForeignKeyConstraints();
        

        return response()->json([
            "message" => "creation de la commande reussi, super !",
            "articles" => $article,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $article = Order::findOrFail($id);
        $article->update($request->all());

        return response()->json($article, 200);
    }

    public function destroy($id)
    {
        $article = Order::findOrFail($id);
        $article->delete();

        return response()->json(['message' => 'commande supprimée correctement']);
    }
}