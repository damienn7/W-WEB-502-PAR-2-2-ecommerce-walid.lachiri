<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order_item extends Model
{
    protected $table = 'order_items';
    protected $fillable = ['order_id', 'item_id', 'quantity', 'unit_price'];

    public $timestamps = true;


}