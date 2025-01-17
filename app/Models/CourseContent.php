<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseContent extends Model
{
    use HasFactory;

    protected $table = 'course_content';

    protected $primaryKey = 'id_class';

    protected $fillable = [
        'id_course',
        'title',
        'description',
        'video_url',
        'pdf_path',
        'banner',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class, 'id_course');
    }
}
