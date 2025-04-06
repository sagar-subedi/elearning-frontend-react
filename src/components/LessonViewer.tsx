import { useEffect } from "react";
import { Link } from "react-router-dom";

interface LessonViewerProps {
    selectedCourse: string | null | undefined;
    selectedLesson: string | null | undefined;
    lessons: string[];
    onSelectLesson: (lesson: string | null) => void;
    onToggleSideBarState: (isSideBarOpen: boolean) => void;
    isSidebarOpen: boolean;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ selectedCourse, selectedLesson, lessons, onSelectLesson, onToggleSideBarState, isSidebarOpen }) => {
    const baseUrl: string = import.meta.env.VITE_API_BASE_URL as string;

    if (!selectedLesson) {
        return <div className="flex-1 flex items-center justify-center">Select a lesson to view content.</div>;
    }

    let currentIndex = lessons.indexOf(selectedLesson);
    let prevLesson: string | null = currentIndex > 0 ? lessons[currentIndex - 1] : null;
    let nextLesson: string | null = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

    useEffect(() => {
        currentIndex = lessons.indexOf(selectedLesson);
        prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
        nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
    }, [lessons, selectedLesson]);

    return (
        <div className="flex-1 flex flex-col p-4 h-screen">
            <div className="flex justify-between mb-2">
                <h2 className="text-xl font-bold">Lesson: {selectedLesson.replace(/_/g, " ")}</h2>
                <div className="flex space-x-1 h-10">
                    <Link to="/" className="h-full content-center text-left px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                        Home
                    </Link>
                    <button
                        className="z-2 px-4 py-2 bg-gray-500 text-white rounded-md md:hidden"
                        onClick={() => onToggleSideBarState(!isSidebarOpen)}
                    >
                    {isSidebarOpen ? "Close" : "Menu"}
                    </button>
                </div>
            </div>
            <iframe
                src={`${baseUrl}/courses/${selectedCourse}/${selectedLesson}`}
                className="flex-grow w-full h-full border rounded-lg shadow-md"
            />
            <div className="mt-4 flex justify-between">
                {prevLesson && (
                    <button
                        onClick={() => onSelectLesson(prevLesson)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Previous
                    </button>
                )}
                {nextLesson && (
                    <button
                        onClick={() => onSelectLesson(nextLesson)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-auto"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};
