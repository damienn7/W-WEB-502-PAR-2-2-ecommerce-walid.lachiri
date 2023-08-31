<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    protected $fillable = ['user_id', 'status', 'delivery_address','country','delivery_method',"gift"];

    public $timestamps = true;


}