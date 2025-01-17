<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('course_content', function (Blueprint $table) {
            $table->string('banner')->nullable()->after('pdf_path'); // Añadir el campo banner
        });
    }

    public function down()
    {
        Schema::table('course_content', function (Blueprint $table) {
            $table->dropColumn('banner');
        });
    }

};
