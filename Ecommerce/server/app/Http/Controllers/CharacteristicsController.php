<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Characteristics;


class CharacteristicsController extends Controller
{

    public function index()
    {
        return DB::table('characteristics')
            ->get();
    }

    public function showCharacteristics($id)
    {
        return Characteristics::query()
            ->select("characteristic", "value")
            ->join('items', 'characteristics.item_id', '=', 'items.id')
            ->where("characteristics.item_id", "=", $id)
            ->get()
            ->groupBy("characteristic")
            ->map
            ->pluck("value")
            ->toArray();
    }
    
    public function showPricesIncreases($id) {
        return Characteristics::query()
        ->select("multiplier");
    }

    function create(Request $request)
    {
        $article = new Characteristics;
        $article->item_id = $request->item_id;
        $article->characteristic = $request->characteristic;
        $article->value = $request->value;
        $article->save();
        return response()->json([
            "message" => "Nouvelle caractéristique pour votre article",
            "articles" => $article,
        ], 201);
    }

    function update(Request $request, $id)
    {
        $article = Characteristics::findOrFail($id);
        $article->update($request->all());
        return response()->json($article, 200);
    }

    public function destroy($id)
    {
        $article = Characteristics::findOrFail($id);
        $article->delete();
        return response()->json(['message' => 'Carac supprimée']);
    }

}