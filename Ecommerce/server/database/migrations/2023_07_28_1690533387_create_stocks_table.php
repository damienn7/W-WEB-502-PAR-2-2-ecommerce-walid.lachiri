<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStocksTable extends Migration
{
    public function up()
    {
        Schema::create('stocks', function (Blueprint $table) {

		$table->increments(id);
		$table->integer('quantite',)->default('0');
		$table->string('adresse',45);
		$table->float('frais_port')->default('0');
		$table->primary('id');

        });
    }

    public function down()
    {
        Schema::dropIfExists('stocks');
    }
}