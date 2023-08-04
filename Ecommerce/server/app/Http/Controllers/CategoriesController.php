<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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