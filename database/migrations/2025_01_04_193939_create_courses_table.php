<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id('id_course'); // ID único del curso
            $table->foreignId('id_user')->constrained('users', 'id_user')->onDelete('cascade'); // ID de la persona que creó el curso
            $table->string('logo')->nullable(); // Logo del curso
            $table->string('title'); // Título del curso
            $table->text('description'); // Descripción del curso
            $table->timestamps(); // Fecha de creación y actualización
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
