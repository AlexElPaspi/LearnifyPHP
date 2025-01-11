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

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'course_student', 'id_course', 'id_user')
                    ->withTimestamps();
    }

    public function contents()
    { 
        return $this->hasMany(CourseContent::class, 'id_course');
    }
}
