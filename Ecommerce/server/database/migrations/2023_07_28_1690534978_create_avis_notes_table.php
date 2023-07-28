<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAvisNotesTable extends Migration
{
    public function up()
    {
        Schema::create('avis_notes', function (Blueprint $table) {

		$table->increments(id);
		$table->string('name',45)->nullable()->default('NULL');
		$table->integer('users_id',);
		$table->integer('articles_id',);
		$table->integer('articles_caracteristiques_id',);
		$table->integer('articles_stocks_id',);
		$table->primary(['id','users_id','articles_id','articles_caracteristiques_id','articles_stocks_id']);
		$table->foreign('articles_id')->references('id')->on('articles');		$table->foreign('users_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('avis_notes');
    }
}