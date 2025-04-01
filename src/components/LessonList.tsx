import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sortLessons } from "../utils/lessonUtils";

interface LessonListProps {
    selectedCourse: string | null | undefined;
    onSelectLesson: (lesson: string) => void;
    selectedLesson: string | null;
}

export const LessonList: React.FC<LessonListProps> = ({ selectedCourse, onSelectLesson, selectedLesson }) => {
    const baseUrl: string = import.meta.env.VITE_API_BASE_URL as string;
    const [lessons, setLessons] = useState<string[]>([]);

    useEffect(() => {
        if (selectedCourse) {
            fetch(`${baseUrl}/courses/${selectedCourse}/lessons/`)
                .then((response) => response.json())
                .then((data: string[]) => {
                    // Filter out lessons starting with '.'
                    const filteredLessons = data.filter((lesson) => !lesson.startsWith("."));
                    const sortedLessons = sortLessons(filteredLessons);                    setLessons(sortedLessons);
                })
                .catch((error) => console.error("Error fetching lessons:", error));
        }
    }, [selectedCourse, baseUrl]);

    return (
        <div className="w-1/4 p-4 bg-gray-200 h-screen overflow-y-auto">
            <Link to="/" className="block text-left px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mb-4">
                Back to Home
            </Link>
            <h2 className="text-xl font-bold mb-4">Lessons in {selectedCourse}</h2>
            <ul>
                {lessons.map((lesson) => (
                    <li key={lesson} className="mb-2">
                        <button
                            onClick={() => {
                                localStorage.setItem(`lastLesson-${selectedCourse}`, lesson);
                                onSelectLesson(lesson);
                            }}
                            className={`w-full text-left px-4 py-2 rounded-md transition-all ${
                                selectedLesson === lesson
                                    ? "bg-blue-700 text-white"
                                    : "bg-gray-300 text-black"
                            } hover:bg-blue-500 hover:text-white`}
                        >
                            {lesson.replace(/_/g, " ")}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
