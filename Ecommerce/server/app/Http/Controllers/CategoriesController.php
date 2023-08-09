<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Category;

class CategoriesController extends Controller
{
    function create(Request $request)
    {
        $category = new Category;
        $category->sub_category = $request->sub_category;
        $category->category = $request->category;
        $category->save();
        return response()->json([
            "message" => "Catégorie créée !",
            "category" => $category
        ], 201);
    }

    public function index(Request $request)
    {
        $end = $request->input('_end');  
        $start = $request->input('_start');  
        $category = Category::all()->skip($start)->take($end-$start)->values();
        return response()
            ->json($category, 200, ['X-Total-Count' => Category::count(), 'Access-Control-Expose-Headers' => 'X-Total-Count']);
    }

    public function show($id)
    {
        return Category::findOrFail($id);
    }


    //Peut probablement être amélioré pour être dynamique, mais ces 3 méthodes affichent chacune un type de produit
    public function showCategories()
    {
        //recup query param et le mettre après le égal
        return Category::query()
        //Alors j'ai pas tout compris mais EN GROS le get il faut le mettre avant le group by sinon ça fait le bazar
        ->get()
        ->groupBy("category")
        //Permet de passer par tous les éléments
        ->map
        // Récupère les clés et transforme en tableau
        ->pluck("sub_category")
        //Renvoie un tableau
        ->toArray();
    }

    function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());

        return response()->json($category, 200);
        
    }
    public function delete($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Catégorie supprimée.']);
    }

}