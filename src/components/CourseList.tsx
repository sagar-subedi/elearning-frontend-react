import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const CourseList = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/courses/`)
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    return (
        <div className="w-full p-4 bg-gray-100 h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course} className="mb-2">
                        <Link
                            to={`/courses/${course}`}
                            className="block text-left px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            {course}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};