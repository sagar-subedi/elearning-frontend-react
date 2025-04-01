import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Course {
    name: string;
    isFavorite: boolean;
}

export const CourseList: React.FC = () => {
    const baseUrl: string = import.meta.env.VITE_API_BASE_URL as string;
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        fetch(`${baseUrl}/courses/`)
            .then((response) => response.json())
            .then((data: string[]) =>
                setCourses(data.map((course) => ({ name: course, isFavorite: false })))
            )
            .catch((error) => console.error("Error fetching courses:", error));
    }, [baseUrl]);

    const toggleFavorite = (courseName: string) => {
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.name === courseName
                    ? { ...course, isFavorite: !course.isFavorite }
                    : course
            )
        );
    };

    const filteredCourses = courses
        .filter((course) =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite)); // Favorites on top

    return (
        <div className="w-full p-4 bg-gray-100 h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Courses</h2>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map((course) => (
                    <div
                        key={course.name}
                        className="p-4 bg-white shadow-md rounded-md flex flex-col justify-between"
                    >
                        <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                        <div className="flex justify-between items-center">
                            <Link
                                to={`/courses/${course.name}`}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                View Course
                            </Link>
                            <button
                                onClick={() => toggleFavorite(course.name)}
                                className={`px-4 py-2 rounded-md ${
                                    course.isFavorite
                                        ? "bg-yellow-400 hover:bg-yellow-500"
                                        : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            >
                                {course.isFavorite ? "Unfavorite" : "Favorite"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
