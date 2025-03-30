import { useParams } from "react-router-dom";
import { LessonList } from "../components/LessonList";
import { LessonViewer } from "../components/LessonViewer";
import { useEffect, useState } from "react";
import { sortLessons } from "../utils/lessonUtils";

export const CoursePage: React.FC = () => {
    const baseUrl: string = import.meta.env.VITE_API_BASE_URL as string;
    const { courseId } = useParams<{ courseId: string }>();

    const [selectedLesson, setSelectedLesson] = useState<string | null>(
        localStorage.getItem(`lastLesson-${courseId}`) || null
    );
    const [lessons, setLessons] = useState<string[]>([]);

    useEffect(() => {
        if (!courseId) return;

        fetch(`${baseUrl}/courses/${courseId}/lessons/`)
            .then((response) => response.json())
            .then((data: string[]) => {
                const sortedLessons = sortLessons(data);
                setLessons(sortedLessons);
            })
            .catch((error) => console.error("Error fetching lessons:", error));
    }, [courseId, baseUrl]);

    return (
        <div className="flex h-screen">
            <LessonList
                selectedCourse={courseId}
                onSelectLesson={setSelectedLesson}
                selectedLesson={selectedLesson}
            />
            <LessonViewer
                selectedCourse={courseId}
                selectedLesson={selectedLesson}
                lessons={lessons}
                onSelectLesson={setSelectedLesson}
            />
        </div>
    );
};
