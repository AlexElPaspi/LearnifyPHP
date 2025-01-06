import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseDetailComponent = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`/api/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course', error);
            }
        };

        fetchCourse();
    }, [id]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>{course.title}</h2>
            {course.logo && <img src={`/storage/courses/logos/${course.logo}`} alt={course.title} className="img-fluid" />}
            <p>{course.description}</p>
            <p>Creado por: {course.user.first_name} {course.user.last_name}</p>
        </div>
    );
};

export default CourseDetailComponent;
