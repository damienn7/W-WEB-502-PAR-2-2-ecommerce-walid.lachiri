<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shippingfee extends Model
{
    protected $table = "shipping_fee";
    protected $fillable = ["id", "country", "price"];
    public $timestamps = true;
}