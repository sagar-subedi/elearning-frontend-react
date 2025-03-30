import { useParams } from "react-router-dom";
import { LessonList } from "../components/LessonList";
import { LessonViewer } from "../components/LessonViewer";
import { useEffect, useState } from "react";
import { sortLessons } from "../utils/lessonUtils";

export const CoursePage = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { courseId } = useParams();
    const [selectedLesson, setSelectedLesson] = useState(localStorage.getItem(`lastLesson-${courseId}`) || null);
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/courses/${courseId}/lessons/`)
            .then(response => response.json())
            .then(data => {
                const sortedLessons = sortLessons(data);
                setLessons(sortedLessons);
            })
            .catch(error => console.error("Error fetching lessons:", error));
    }, [courseId]);

    return (
        <div className="flex h-screen">
            <LessonList selectedCourse={courseId} onSelectLesson={setSelectedLesson} selectedLesson={selectedLesson} />
            <LessonViewer selectedCourse={courseId} selectedLesson={selectedLesson} lessons={lessons} onSelectLesson={setSelectedLesson} />
        </div>
    );
};