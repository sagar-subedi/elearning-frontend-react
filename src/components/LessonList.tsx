import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const LessonList = ({ selectedCourse, onSelectLesson, selectedLesson }) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [lessons, setLessons] = useState([]);
    useEffect(() => {
        if (selectedCourse) {
            fetch(`${baseUrl}/courses/${selectedCourse}/lessons/`)
                .then(response => response.json())
                .then(data => {
                    const sortedLessons = data.sort((a, b) => {
                        const extractNumber = str => {
                            const cleanedStr = str.replace(/^[._]+/, ""); // Remove leading '.' or '_'
                            const match = cleanedStr.match(/^\d+/);
                            return match ? parseInt(match[0]) || 0 : 0;
                        };
                        return extractNumber(a) - extractNumber(b);
                    });
                    setLessons(sortedLessons);
                })
                .catch(error => console.error("Error fetching lessons:", error));
        }
    }, [selectedCourse]);

    return (
        <div className="w-1/4 p-4 bg-gray-200 h-screen overflow-y-auto">
            <Link to="/" className="block text-left px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mb-4">Back to Home</Link>
            <h2 className="text-xl font-bold mb-4">Lessons in {selectedCourse}</h2>
            <p>{lessons.length}</p>
            <ul>
                {lessons.map((lesson, index) => (
                    <li key={lesson} className="mb-2">
                        <button
                            onClick={() => {
                                localStorage.setItem(`lastLesson-${selectedCourse}`, lesson);
                                onSelectLesson(lesson);
                            }}
                            className={`w-full text-left px-4 py-2 rounded-md transition-all ${selectedLesson === lesson ? "bg-green-700" : "bg-green-500"} text-white hover:bg-green-600`}
                        >
                            {lesson.replace(/_/g, " ")}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};