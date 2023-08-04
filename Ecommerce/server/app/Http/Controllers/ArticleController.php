<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Builder;

class ArticleController extends Controller
{

    public function index(Request $request)
    {
        return Article::all();
    }

    // G̸̝̼͔̓͆͝a̴͓̟̠̚͝͝m̴̻̘͋͠͠e̴̡͓͙̓̈́̒
    // READ | WHERE | ORDER BY
    // route : 'articles/search?q={search}&c={category}&sc={sub_category}'
    public function search($category, $sub_category,$search)
    {
        if ($category === "unset" && $sub_category !== "unset" && $search !== "unset") {
            $result = DB::table('items')
            ->join('categories', 'categories.id', '=', 'items.id_category')
            ->where('sub_category', 'like', "%$sub_category%")
            ->where('name','like' ,"%$search%")
            ->get();
        } elseif ($category === "unset" && $sub_category === "unset" && $search !== "unset") {
            $result = DB::table('items')
            ->where('name','like' ,"%$search%")
            ->get();
        } elseif ($category !== "unset" && $sub_category !== "unset" && $search === "unset") {
            $result = DB::table('items')
            ->join('categories', 'categories.id', '=', 'items.id_category')
            ->where('category', 'like', "%$category%")
            ->where('sub_category', 'like', "%$sub_category%")
            ->get();
        } elseif ($category !== "unset" && $sub_category !== "unset" && $search !== "unset") {
            $result = DB::table('items')
            ->join('categories', 'categories.id', '=', 'items.id_category')
            ->where('category', 'like', "%$category%")
            ->where('sub_category', 'like', "%$sub_category%")
            ->where('name','like' ,"%$search%")
            ->get();
        } elseif ($category !== "unset" && $sub_category === "unset" && $search !== "unset") {
            $result = DB::table('items')
            ->join('categories', 'categories.id', '=', 'items.id_category')
            ->where('category', 'like', "%$category%")
            ->where('name','like' ,"%$search%")
            ->get();
        } elseif ($category === "unset" && $sub_category !== "unset" && $search === "unset") {
            $result = DB::table('items')
            ->join('categories', 'categories.id', '=', 'items.id_category')
            ->where('category', 'like', "%$sub_category%")
            ->get();
        } elseif ($category !== "unset" && $sub_category === "unset" && $search === "unset") {
            $result = DB::table('items')
            ->join('categories', 'categories.id', '=', 'items.id_category')
            ->where('category', 'like', "%$sub_category%")
            ->get();
        } else {
            $result = ["Erreur"=>"Veuillez renseigner une catégorie et/ou une sous-catégorie et/ou un nom de produits."];
        }

        if (empty($result)) {
            return ["Erreur"=>"Nous n'avons pas pu trouver de résultat associé à votre recherche."];
        } else {
            return $result;
        }

        // TEST
        // return ["c"=>$category,"sub_category"=>$sub_category,"name"=>$search];
    }
    // G̸̝̼͔̓͆͝a̴͓̟̠̚͝͝m̴̻̘͋͠͠e̴̡͓͙̓̈́̒

    public function METHODEDEFILSDEPUTE(Request $request)
    {
        return DB::table('items')
            ->join('categories', 'categories.id', '=', 'items.id_category')
            // ->join('ratings', 'ratings.id_article', '=', 'items.id' )
            ->orderBy('views', 'desc')
            ->get();
    }

    public function show($id)
    {
        return Article::findOrFail($id);
    }

    function createArticle(Request $request)
    {
        $article = new Article;
        $article->name = $request->name;
        $article->description = $request->description;
        $article->Id_category = $request->Id_category;
        $article->image = $request->image;
        $article->views = $request->views;
        $article->price = $request->price;
        $article->stock = $request->stock;
        $article->rating = $request->rating;
        $article->save();
        return response()->json([
            "message" => "creation de l'article reussi",
            "articles" => $article,
        ], 201);
    }



    function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->update($request->all());
        return response([
            'message' => 'mise a jour de article reussi',
            'donnees' => $article
        ]);
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return response()->json(['message' => 'Article supprimé correctement']);
    }
    public function searchNavigation($category, $sous_category){
        return DB::select('SELECT * FROM categories c INNER JOIN items i ON c.id = i.id_category WHERE category = ? AND sub_category = ?', [$category, $sous_category]);
    }
}
