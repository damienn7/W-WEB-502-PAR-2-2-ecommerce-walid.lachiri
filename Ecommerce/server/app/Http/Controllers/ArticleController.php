<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Facades\DB;
class ArticleController extends Controller
{

    public function index()
    {
        return Article::all();
    }

function createArticle(Request $request){
    $article = new Article;  
    $article->image = $request->image;   
   $article->name = $request->name;   
   $article->description = $request->description;  
   $article->price =$request->price;  
//    $article->stocks_id = $request->stocks_id; 
   $article->rating = $request->rating;  

   $article->save();                  
return response()->json([         
          "message" => "creation de l'article reussix",         
           "articles"=> $article,       
      ], 201);  
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