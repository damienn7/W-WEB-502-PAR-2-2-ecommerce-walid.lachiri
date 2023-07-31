<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandesTable extends Migration
{
    public function up()
    {
        Schema::create('commandes', function (Blueprint $table) {

		$table->increments("id");
		$table->string('adresse');
		$table->string('codePostal',32);
		$table->string('email');
		$table->string('telephone',10);
		$table->string('paiement',45);
		$table->tinyInteger('paiementIsVerified',)->default('0');
		$table->float('prix_total_ttc');
		$table->integer('livraison_id',);
		$table->integer('paniers_id',);
		$table->integer('paniers_users_id',);
		$table->primary(['id','livraison_id','paniers_id','paniers_users_id']);
		$table->foreign('livraison_id')->references('id')->on('livraison');		$table->foreign('paniers_id')->references('id')->on('paniers');
        });
    }

    public function down()
    {
        Schema::dropIfExists('commandes');
    }
}