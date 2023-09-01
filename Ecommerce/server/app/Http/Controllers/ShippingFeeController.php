<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShippingFee;

class ShippingFeeController extends Controller
{
    function create(Request $request)
    {
        $Shippingfee = new Shippingfee;
        $Shippingfee->country = $request->country;
        $Shippingfee->price = $request->price;
        $Shippingfee->save();
        return response()->json([
            "message" => "Shippingfee créée !",
            "Shippingfee" => $Shippingfee
        ], 201);
    }

    public function index(Request $request)
    {
        $end = $request->input('_end');  
        $start = $request->input('_start');  
        $Shippingfee = Shippingfee::all()->skip($start)->take($end-$start)->values();
        return response()
            ->json($Shippingfee, 200, ['X-Total-Count' => Shippingfee::count(), 'Access-Control-Expose-Headers' => 'X-Total-Count']);
    }

    public function show($id)
    {
        return Shippingfee::findOrFail($id);
    }


    function update(Request $request, $id)
    {
        $category = Shippingfee::findOrFail($id);
        $category->update($request->all());

        return response()->json($category, 200);
        
    }
    public function delete($id)
    {
        $category = Shippingfee::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Shippingfee supprimée.']);
    }

    public function checkBanStatus($country) {
        $shippingFee = Shippingfee::where('country','=', $country)->first();
        
        if ($shippingFee->ban) {
            return response()->json(['ban' => true, 'message' => 'Impossible de livrer dans ce pays']);
        }
        return response()->json(['ban' => false]);
    }
    public function pays($country)
    {
        return Shippingfee::query()
        ->select("price")
        ->where('country','=', $country)
        ->get();
    }
   

}