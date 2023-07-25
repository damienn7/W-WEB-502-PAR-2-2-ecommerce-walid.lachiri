<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->string('adresse', 255);
            $table->string('codePostal', 255);
            $table->string('email', 255);
            $table->string('telephone', 10);
            $table->string('paiement', 45);
            $table->tinyInteger('paiementIsVerified')->default(0);
            $table->integer('panier_id')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
