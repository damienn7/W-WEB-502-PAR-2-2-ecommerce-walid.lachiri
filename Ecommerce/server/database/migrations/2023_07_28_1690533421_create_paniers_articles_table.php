<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaniersArticlesTable extends Migration
{
    public function up()
    {
        Schema::create('paniers_articles', function (Blueprint $table) {

		$table->integer('id_panier',);
		$table->integer('id_articles',);
		$table->foreign('id_articles')->references('id')->on('articles');		$table->foreign('id_panier')->references('id')->on('paniers');
        });
    }

    public function down()
    {
        Schema::dropIfExists('paniers_articles');
    }
}