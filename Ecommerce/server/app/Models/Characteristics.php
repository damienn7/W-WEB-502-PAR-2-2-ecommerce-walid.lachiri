<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Characteristics extends Model
{
    protected $table = "characteristics";
    protected $fillable = ["item_id", "characteristics", "value", "multiplier"];
    // public $timestamps = false;

}
