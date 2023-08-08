<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Facades\DB;
class ArticleController extends Controller
{

    public function index(Request $request)
    {
        return Article::all();
    }


public function METHODEDEFILSDEPUTE(Request $request){
    return DB::table('items')
            ->select('*', 'items.id as idefix')     
            ->join('categories', 'categories.id', '=', 'items.id_category')
            // ->join('ratings', 'ratings.id_article', '=', 'items.id' )
            ->orderBy('views', 'desc')
            ->get();
}

public function methodetotalementraisonnable($id){
    return DB::table('items')  
    ->where('items.id', '=', $id)
    ->join('categories', 'categories.id', '=', 'items.id_category')
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
   $article->Id_category = $request->Id_category;  
   $article->image =$request->image;  
   $article->views = $request->views;
   $article->price = $request->price;  
   $article->stock = $request->stock;  
   $article->rating = $request->rating;  
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