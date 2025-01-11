<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseContentTable extends Migration
{
    public function up()
    {
        Schema::create('course_content', function (Blueprint $table) {
            $table->id('id_class');
            $table->unsignedBigInteger('id_course');
            $table->string('title');
            $table->text('description');
            $table->string('video_url'); // URL del video de YouTube
            $table->string('pdf_path')->nullable(); // Ruta del PDF
            $table->timestamps();

            $table->foreign('id_course')->references('id_course')->on('courses')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('course_content');
    }
}
