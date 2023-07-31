<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesCaracteristiquesTable extends Migration
{
    public function up()
    {
        Schema::create('articles_caracteristiques', function (Blueprint $table) {

		$table->integer('id_articles',);
		$table->integer('id_caracteristiques',);
		$table->foreign('id_articles')->references('id')->on('articles');		
        $table->foreign('id_caracteristiques')->references('id')->on('caracteristiques');
        });
    }

    public function down()
    {
        Schema::dropIfExists('articles_caracteristiques');
    }
}