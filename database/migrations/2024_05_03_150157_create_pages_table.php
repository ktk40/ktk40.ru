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
        Schema::create('pages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('position')->default(0);
            $table->uuid('parent_id')->nullable();
            $table->boolean('isFolder')->default(false);
            $table->boolean('siteBar')->default(true);
            $table->boolean('cardBody')->default(true);
            $table->boolean('isContainer')->default(true);
            $table->string('url')->unique();
            $table->set('status', [
                'draft', // Черновик
                'discharge', // Выгрузка
                'published' // Опубликовано
            ]);
            $table->softDeletesTz();
            $table->timestampsTz();
        });

        Schema::table('pages', function (Blueprint $table) {
            $table->foreign('parent_id')->references('id')->on('pages')->onDelete('cascade');
        });

        Schema::create('pages_translations', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('page_id');
            $table->string('locale')->index();

            $table->string('title');
            $table->string('description')->nullable();
            $table->longText('text')->nullable();

            $table->unique(['page_id','locale']);
        });

        Schema::table('pages_translations', function (Blueprint $table) {
            $table->foreign('page_id')->references('id')->on('pages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
        Schema::dropIfExists('pages_translations');
    }
};
