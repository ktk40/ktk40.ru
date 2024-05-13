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
        Schema::create('docs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('position')->default(0);
            $table->boolean('isFolder')->default(false);
            $table->set('status', [
                'discharge', // Выгрузка
                'published' // Опубликовано
            ]);
            $table->softDeletesTz();
            $table->timestampsTz();
        });

        Schema::create('docs_translations', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('doc_id');
            $table->string('locale')->index();

            $table->string('title');
            $table->uuid('media_id')->index();

            $table->unique(['doc_id','locale']);
        });

        Schema::table('docs_translations', function (Blueprint $table) {
            $table->foreign('doc_id')->references('id')->on('docs')->onDelete('cascade');
            $table->foreign('media_id')->references('id')->on('medias')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('docs');
        Schema::dropIfExists('docs_translations');
    }
};
