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

    // Load favorite courses from localStorage
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${baseUrl}/courses/`);
                const data: string[] = await response.json();

                // Retrieve favorites from localStorage
                const storedFavorites = JSON.parse(localStorage.getItem("favoriteCourses") || "{}");

                const coursesWithFavorites = data.map((course) => ({
                    name: course,
                    isFavorite: storedFavorites[course] || false,
                }));

                setCourses(coursesWithFavorites);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, [baseUrl]);

    // Toggle favorite and persist to localStorage
    const toggleFavorite = (courseName: string) => {
        setCourses((prevCourses) => {
            const updatedCourses = prevCourses.map((course) =>
                course.name === courseName
                    ? { ...course, isFavorite: !course.isFavorite }
                    : course
            );

            // Update localStorage
            const favorites = updatedCourses.reduce((acc, course) => {
                if (course.isFavorite) acc[course.name] = true;
                return acc;
            }, {} as Record<string, boolean>);

            localStorage.setItem("favoriteCourses", JSON.stringify(favorites));

            return updatedCourses;
        });
    };

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const favoriteCourses = filteredCourses.filter((course) => course.isFavorite);
    const otherCourses = filteredCourses.filter((course) => !course.isFavorite);

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

            {/* Favorite Courses Section */}
            {favoriteCourses.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Favorite Courses</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favoriteCourses.map((course) => (
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
                                        className="px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500"
                                    >
                                        Unfavorite
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Other Courses Section */}
            <div>
                <h3 className="text-xl font-semibold mb-4">All Courses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {otherCourses.map((course) => (
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
                                    className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                                >
                                    Favorite
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
