<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesCategoriesTable extends Migration
{
    public function up()
    {
        Schema::create('articles_categories', function (Blueprint $table) {

		$table->integer('id_articles',);
		$table->integer('id_categories',);
		$table->foreign('id_articles')->references('id')->on('articles');		$table->foreign('id_categories')->references('id')->on('categories');
        });
    }

    public function down()
    {
        Schema::dropIfExists('articles_categories');
    }
}