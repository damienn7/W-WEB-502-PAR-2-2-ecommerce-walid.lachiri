<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShippingfeeTable extends Migration
{
    public function up()
    {
        Schema::create('shipping_fee', function (Blueprint $table) {
            $table->id();
            $table->string('country');
            $table->integer('price');
            $table->boolean('ban')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shipping_fee');
    }
}
