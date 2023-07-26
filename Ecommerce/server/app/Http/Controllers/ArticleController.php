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

public function store(Request $request)
{
    $article = Article::create($request->all());
    return $article;
}

public function show($id)
{
    return Article::findOrFail($id);
}

public function update(Request $request, $id)
{
    $article = Article::findOrFail($id);
    $article->update($request->all());
    return $article;
}

public function destroy($id)
{
    $article = Article::findOrFail($id);
    $article->delete();
    return response()->json(['message' => 'Article supprimé correctement']);
}
}