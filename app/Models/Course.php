<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_course';

    protected $fillable = [
        'id_user',
        'title',
        'description',
        'logo',
    ];
}
