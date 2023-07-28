<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonalAccessTokensTable extends Migration
{
    public function up()
    {
        Schema::create('personal_access_tokens', function (Blueprint $table) {

		$table->bigIncrements('id')->unsigned();
		$table->string('tokenable_type');
		$table->bigInteger('tokenable_id',)->unsigned();
		$table->string('name');
		$table->string('token',64);
		$table->text('abilities');
		$table->timestamp('last_used_at')->nullable()->default('NULL');
		$table->timestamp('expires_at')->nullable()->default('NULL');
		$table->timestamp('created_at')->nullable()->default('NULL');
		$table->timestamp('updated_at')->nullable()->default('NULL');
		$table->primary('id');

        });
    }

    public function down()
    {
        Schema::dropIfExists('personal_access_tokens');
    }
}