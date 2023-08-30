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
            ->select('*', 'items.id as idefix')     
            ->join('categories', 'categories.id', '=', 'items.id_category')
            ->orderBy('views', 'desc')
            ->get();

    }

    public function searchSuggestion($request)
    {

        return DB::table('items')
            ->select('*', 'items.id as idefix')
            ->join('categories', 'categories.id', '=', 'items.id_category')
            ->where("items.name", "like", "%$request%")
            // ->orderBy('views', 'desc')
            ->limit(10)
            ->get();

    }
  
public function peripheriquenordsortieA3(Request $request){

    return DB::table('items')
            ->select('*', 'items.id as idefix')     
            ->join('categories', 'categories.id', '=', 'items.id_category')
            ->leftJoin('ratings', 'items.id', '=', 'id_article')
            // ->avg('ratings')
           ->orderBy('recommandation', 'desc')
           ->orderBy('views', 'desc')
           // ->get();

            ->get()
            ->groupBy("idefix")
            ->map(function ($result) {
                $avg = 0;
                    foreach($result as $article) {
                        $avg += $article->rating;
                    }
                    $avg = $avg / count($result);
                $returnedArticle = $result[0];
                $returnedArticle->avgRating=$avg;
                return $returnedArticle;    
            })->values();
    }

    public function methodetotalementraisonnable($id)
    {
        return DB::table('items')
            ->where('items.id', '=', $id)
            ->join('categories', 'categories.id', '=', 'items.id_category')
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

    public function searchNavigation($category, $sous_category, $id = null)
    {

        if ($id) {
            $query = DB::table('items');
            $query->increment('views');
            return DB::select('SELECT * FROM categories c INNER JOIN items i ON c.id = i.id_category WHERE category = ? AND sub_category = ? AND i.id = ?', [$category, $sous_category, $id]);
        } else {
            return DB::select('SELECT * FROM categories c INNER JOIN items i ON c.id = i.id_category WHERE category = ? AND sub_category = ?', [$category, $sous_category]);
        }
    }
    public function averagerating(Request $request, $articlos){
        return DB::table('ratings')
        ->where('id_article', '=', $articlos)
        ->groupBy('id_article')
        ->select(DB::raw('AVG(rating) as test'))
        ->get();
}
}
