<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLivraisonTable extends Migration
{
    public function up()
    {
        Schema::create('livraison', function (Blueprint $table) {

		$table->increments("id");
		$table->string('mode_de_livraison');
		$table->float('frais_de_livraison');
		$table->tinyInteger('is_delivered',)->default('0');
		$table->primary('id');

        });
    }

    public function down()
    {
        Schema::dropIfExists('livraison');
    }
}