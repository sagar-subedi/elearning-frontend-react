import { useEffect, useState, useRef } from "react";
import { sortLessons } from "../utils/lessonUtils";
import { authFetch } from "../utils/authFetch";

interface LessonListProps {
    selectedCourse: string | null | undefined;
    onSelectLesson: (lesson: string) => void;
    selectedLesson: string | null;
}

export const LessonList: React.FC<LessonListProps> = ({ selectedCourse, onSelectLesson, selectedLesson }) => {
    const baseUrl: string = import.meta.env.VITE_API_BASE_URL as string;
    const [lessons, setLessons] = useState<string[]>([]);
    const selectedLessonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (selectedCourse) {
            authFetch(`${baseUrl}/courses/${selectedCourse}/lessons/`)
                .then((data: string[]) => {
                    // Filter out lessons starting with '.'
                    const filteredLessons = data.filter((lesson) => !lesson.startsWith("."));
                    const sortedLessons = sortLessons(filteredLessons);
                    setLessons(sortedLessons);
                })
                .catch((error) => console.error("Error fetching lessons:", error));
        }
    }, [selectedCourse, baseUrl]);

    // Scroll to the selected lesson when it changes or on initial load
    useEffect(() => {
        if (selectedLessonRef.current) {
            selectedLessonRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [selectedLesson, lessons]);

    return (
        <>
            <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-4 m-4">{selectedCourse}</h2>
                
                <div className="bg-gray-200 h-screen overflow-y-auto px-2">
                    <ul>
                        {lessons.map((lesson) => (
                            <li key={lesson} className="mb-2">
                                <button
                                    ref={selectedLesson === lesson ? selectedLessonRef : null}
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
            </div>
        </>
    );
};
