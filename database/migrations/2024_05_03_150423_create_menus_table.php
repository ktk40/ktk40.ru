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
        Schema::create('menus', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('menu_id');
            $table->integer('position')->default(0);
            $table->string('url');
            $table->uuid('parent_id')->nullable()->index();
            $table->set('status', [
                'discharge', // Выгрузка
                'published' // Опубликовано
            ]);
            $table->timestampsTz();
        });

        Schema::table('menus', function (Blueprint $table) {
            $table->foreign('parent_id')->references('id')->on('menus')->onDelete('cascade');
        });

        Schema::create('menus_translations', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('menu_id');
            $table->string('locale')->index();

            $table->string('title');

            $table->unique(['menu_id','locale']);
        });

        Schema::table('menus_translations', function (Blueprint $table) {
            $table->foreign('menu_id')->references('id')->on('menus')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
        Schema::dropIfExists('menus_translations');
    }
};
