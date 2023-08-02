<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoriesController extends Controller
{
    function createCategory(Request $request)
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