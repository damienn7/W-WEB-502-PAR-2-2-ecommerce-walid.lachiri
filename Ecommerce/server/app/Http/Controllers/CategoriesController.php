<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoriesController extends Controller
{
    function createCategory(Request $request)
    {
        $category = new Category;
        $category->sous_categorie_name = $request->sous_categorie_name;
        $category->categorie_name = $request->categorie_name;
        $category->save();
        return response()->json([
            "message" => "Catégorie créée !",
            "articles" => $category
        ], 201);
    }

    public function showCategories()
    {
        return Category::all();
    }

    public function showCategory($id)
    {
        return Category::findOrFail($id);
    }

    function updateCategory(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return response([
            'message' => 'Catégorie mise à jour',
            'donnees' => $category
        ]);
    }
    public function deleteCategory($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Catégorie supprimée.']);
    }

}