<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {

		$table->increments(id);
		$table->string('image');
		$table->string('nom');
		$table->string('description',1000);
		$table->float('prix');
		$table->timestamp('updated_at')->nullable()->default('NULL');
		$table->timestamp('created_at')->nullable()->default('CURRENT_TIMESTAMP');
		$table->integer('stocks_id',);
		$table->integer('note_totale',)->default('0');
		$table->primary(['id','stocks_id']);
		$table->foreign('stocks_id')->references('id')->on('stocks');
        });
    }

    public function down()
    {
        Schema::dropIfExists('articles');
    }
}