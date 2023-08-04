<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Builder;

class ArticleController extends Controller
{

    public function index(Request $request)
    {
        $end = $request->input('_end');
        $start = $request->input('_start');
        $articles = Article::skip($start)->take($end - $start)->get();
        return response()
            ->json($articles, 200, ['X-Total-Count' => Article::count(), 'Access-Control-Expose-Headers' => 'X-Total-Count']);
    }

    // G̸̝̼͔̓͆͝a̴͓̟̠̚͝͝m̴̻̘͋͠͠e̴̡͓͙̓̈́̒
    // READ | WHERE | ORDER BY
    // route : 'articles/search?q={search}&c={category}&sc={sub_category}'
    public function search($category, $sub_category, $search)
    {
        if ($category === "unset" && $sub_category !== "unset" && $search !== "unset") {
            $result = DB::table('items')
                ->join('categories', 'categories.id', '=', 'items.id_category')
                ->where('sub_category', 'like', "%$sub_category%")
                ->where('name', 'like', "%$search%")
                ->get();
        } elseif ($category === "unset" && $sub_category === "unset" && $search !== "unset") {
            $result = DB::table('items')
                ->where('name', 'like', "%$search%")
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
                ->where('name', 'like', "%$search%")
                ->get();
        } elseif ($category !== "unset" && $sub_category === "unset" && $search !== "unset") {
            $result = DB::table('items')
                ->join('categories', 'categories.id', '=', 'items.id_category')
                ->where('category', 'like', "%$category%")
                ->where('name', 'like', "%$search%")
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
            $result = ["Erreur" => "Veuillez renseigner une catégorie et/ou une sous-catégorie et/ou un nom de produits."];
        }

        if (empty($result)) {
            return ["Erreur" => "Nous n'avons pas pu trouver de résultat associé à votre recherche."];
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
            ->get();
    }

    public function show($id)
    {
        return Article::findOrFail($id);
    }

    public function createArticle(Request $request)
    {
        $article= Article::create($request->all());
        return response()->json([
            "message" => "creation de l'article reussi",
            "articles" => $article,
        ], 201);
    }



    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->update($request->all());
        return response()->json($article, 200);

    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return response()->json(['message' => 'Article supprimé correctement']);
    }
}
