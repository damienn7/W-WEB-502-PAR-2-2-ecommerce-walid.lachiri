<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;

class RatingController extends Controller
{

    public function index(Request $request)
    {
        $end = $request->input('_end');
        $start = $request->input('_start');
        $articles = Rating::skip($start)->take($end - $start)->get();
        return response()
            ->json($articles, 200, ['X-Total-Count' => Rating::count(), 'Access-Control-Expose-Headers' => 'X-Total-Count']);
    }
    public function showRating($id)
    {
        return Rating::findOrFail($id);
    }

    function create(Request $request)
    {
        $article = new Rating;
        $article->id_user = $request->id_user;
        $article->id_article = $request->id_article;
        $article->rating = $request->rating;
        $article->comment = $request->comment;


        $article->save();
        return response()->json([
            "message" => "creation de la note reussi",
            "articles" => $article,
        ], 201);
    }


    function update(Request $request, $id)
    {
        $article = Rating::findOrFail($id);
        $article->update($request->all());
        return response()->json($article, 200);
    }

    public function destroy($id)
    {
        $article = Rating::findOrFail($id);
        $article->delete();
        return response()->json(['message' => 'note supprimé correctement']);
    }
    public function checkNote($userId, $articleId)
    {
        $rating = Rating::where('id_user', $userId)
                ->where('id_article', $articleId)
                ->first();
    
        if ($rating) {
            return response()->json(['hasNoted' => true, 'ratingId' => $rating->id]);
        } else {
            return response()->json(['hasNoted' => false, 'ratingId' => null]);
        }
    }
    public function getRatingsWithUserNames($id)
    {
        return Rating::query()
        ->select("users.name", "comment",'rating')
        ->join('users', 'id_user', '=', 'users.id')
        ->where("id_article", "=", $id)
        ->get();

    }
}

