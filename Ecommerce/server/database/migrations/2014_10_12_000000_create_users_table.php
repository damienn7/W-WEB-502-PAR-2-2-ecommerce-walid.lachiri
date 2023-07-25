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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email', 255)->unique();
            $table->string('password', 32);
            $table->boolean('admin');
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
            $table->rememberToken();
            $table->timestamp('email_verified_at')->nullable();
            $table->integer('panier_id');
            $table->integer('commandes_id');

        });
    }

    /**
     * Reverse the migrations. 
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
