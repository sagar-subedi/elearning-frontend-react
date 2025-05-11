import { useParams } from "react-router-dom";
import { LessonList } from "../components/LessonList";
import { LessonViewer } from "../components/LessonViewer";
import { useEffect, useState } from "react";
import { sortLessons } from "../utils/lessonUtils";
import { useAuth } from "../context/AuthContext";
import { authFetch } from "../utils/authFetch";

export const CoursePage: React.FC = () => {
  const baseUrl: string = import.meta.env.VITE_API_BASE_URL as string;
  const { courseId } = useParams<{ courseId: string }>();
  const { token } = useAuth();

  const [selectedLesson, setSelectedLesson] = useState<string | null>(
    localStorage.getItem(`lastLesson-${courseId}`) || null
  );
  const [lessons, setLessons] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // State to toggle sidebar

  useEffect(() => {
    if (!courseId || !token) return;

    authFetch(`${baseUrl}/courses/${courseId}/lessons/`,    )
    .then((response) => {
      if (!response.ok) {
          throw new Error("Unauthorized");
      }
      return response;
  })      .then((data: string[]) => {
        // Filter out lessons starting with '.'
        const filteredLessons = data.filter(
          (lesson) => !lesson.startsWith(".")
        );
        const sortedLessons = sortLessons(filteredLessons);
        setLessons(sortedLessons);
      })
      .catch((error) => console.error("Error fetching lessons:", error));
  }, [courseId,token, baseUrl]);

  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-200 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:w-1/4`}
      >
        <LessonList
          selectedCourse={courseId}
          onSelectLesson={setSelectedLesson}
          selectedLesson={selectedLesson}
        />
      </div>

      {/* Lesson Viewer */}
      <div className="flex-1">
        <LessonViewer
          selectedCourse={courseId}
          selectedLesson={selectedLesson}
          lessons={lessons}
          onSelectLesson={setSelectedLesson}
          isSidebarOpen={isSidebarOpen}
          onToggleSideBarState={setIsSidebarOpen}
        />
      </div>
    </div>
  );
};
