<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Facades\DB;
class ArticleController extends Controller
{

    public function index(Request $request)
    {
        $end = $request->input('_end');  
        $start = $request->input('_start');  
        $articles = Article::skip($start)->take($end-$start)->get();
        return response()
            ->json($articles, 200, ['X-Total-Count' => Article::count(), 'Access-Control-Expose-Headers' => 'X-Total-Count']);
    }


public function METHODEDEFILSDEPUTE(Request $request){
    return DB::table('items')       
            ->join('categories', 'categories.id', '=', 'items.id_category')
            // ->join('ratings', 'ratings.id_article', '=', 'items.id' )
            ->get();
}

    public function show($id)
{
    return Article::findOrFail($id);
}

function createArticle(Request $request){
    $article = new Article;  
    $article->name = $request->name;   
   $article->description = $request->description;   
   $article->id_category = $request->id_category;  
   $article->image =$request->image;  
   $article->views = $request->views;
   $article->price = $request->price;  
   $article->stock = $request->stock;  
   $article->save();                  
return response()->json([         
          "message" => "creation de l'article reussi",         
           "articles"=> $article,       
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
}