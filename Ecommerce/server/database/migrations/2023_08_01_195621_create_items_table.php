<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->unsignedBigInteger('id_category');
            $table->string('image');
            $table->integer('views');
            $table->integer('price');
            $table->integer('stock')->default(5);
            $table->integer('promotion')->default(0);
            $table->boolean('recommandation')->default(0);
            $table->timestamps();

            $table->foreign('Id_category')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('items');
    }
}
