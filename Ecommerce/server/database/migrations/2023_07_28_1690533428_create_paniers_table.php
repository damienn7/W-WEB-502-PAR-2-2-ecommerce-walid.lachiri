<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaniersTable extends Migration
{
    public function up()
    {
        Schema::create('paniers', function (Blueprint $table) {

		$table->increments(id);
		$table->integer('users_id',);
		$table->tinyInteger('is_validated',)->default('0');
		$table->primary(['id','users_id']);
		$table->foreign('users_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('paniers');
    }
}