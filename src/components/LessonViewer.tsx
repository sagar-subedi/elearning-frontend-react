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

export const LessonViewer: React.FC<LessonViewerProps> = ({
    selectedCourse,
    selectedLesson,
    lessons,
    onSelectLesson,
    onToggleSideBarState,
    isSidebarOpen,
}) => {
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
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Lesson: {selectedLesson.replace(/_/g, " ")}</h2>
                <div className="flex space-x-4 h-10">
                    {/* Home Button with Icon */}
                    <Link
                        to="/"
                        className="h-full flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-105 transition-transform duration-200 shadow-md"
                        title="Home"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 9.75L12 3l9 6.75M4.5 10.5V21h15v-10.5"
                            />
                        </svg>
                    </Link>

                    {/* Menu Button with Hamburger Icon */}
                    <button
                        className="h-full z-10 flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-105 transition-transform duration-200 shadow-md md:hidden"
                        onClick={() => onToggleSideBarState(!isSidebarOpen)}
                        title="Menu"
                    >
                        {isSidebarOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        )}
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
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-105 transition-transform duration-200 shadow-md"
                    >
                        Previous
                    </button>
                )}
                {nextLesson && (
                    <button
                        onClick={() => onSelectLesson(nextLesson)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-105 transition-transform duration-200 shadow-md ml-auto"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};
