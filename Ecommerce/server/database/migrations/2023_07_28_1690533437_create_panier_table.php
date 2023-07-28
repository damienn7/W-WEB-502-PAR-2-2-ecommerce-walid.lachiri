<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePanierTable extends Migration
{
    public function up()
    {
        Schema::create('panier', function (Blueprint $table) {

		$table->integer('id',);
		$table->tinyInteger('is_verified',)->default('0');
		$table->primary('id');

        });
    }

    public function down()
    {
        Schema::dropIfExists('panier');
    }
}