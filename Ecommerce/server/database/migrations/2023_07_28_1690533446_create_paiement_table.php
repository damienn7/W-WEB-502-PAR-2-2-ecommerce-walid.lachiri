<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaiementTable extends Migration
{
    public function up()
    {
        Schema::create('paiement', function (Blueprint $table) {

		$table->increments("id");
		$table->integer('cvv',)->nullable()->default('NULL');
		$table->string('numero',45)->nullable()->default('NULL');
		$table->integer('commandes_id',);
		$table->integer('commandes_livraison_id',);
		$table->integer('users_id',);
		$table->primary(['id','commandes_id','commandes_livraison_id','users_id']);
		$table->foreign('commandes_id')->references('id')->on('commandes');		$table->foreign('users_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('paiement');
    }
}