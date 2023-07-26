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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 255);
            $table->string('caracteristique', 255);
            $table->string('image', 255);
            $table->float('prix');
            $table->integer('sous_categorie_id');
            // ->constrained('categorie')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('panier_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
