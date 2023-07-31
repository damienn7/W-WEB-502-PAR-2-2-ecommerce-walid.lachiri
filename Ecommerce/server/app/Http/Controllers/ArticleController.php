<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller
{

    public function index()
    {
        return Article::all();
    }

    function createArticle(Request $request)
    {
        $article = new Article;
        $article->image = $request->image;
        $article->nom = $request->nom;
        $article->description = $request->description;
        $article->prix = $request->prix;
        //    $article->caracteristiques_id = $request->caracteristiques_id;  
        $article->stocks_id = $request->stocks_id;
        $article->save();
        return response()->json([
            "message" => "creation de l'article reussi",
            "articles" => $article,
        ], 201);
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