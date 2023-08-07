<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

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

    public function show($id)
    {
        return Order::findOrFail($id);
    }

    public function create(Request $request)
    {
        $article = new Order;
        $article->user_id = $request->user_id;
        $article->status = $request->status;
        $article->delivery_address = $request->delivery_address;
        $article->save();

        return response()->json([
            "message" => "creation de la commande reussi",
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
