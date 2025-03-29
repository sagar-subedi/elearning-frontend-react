import { useEffect } from "react";

export const LessonViewer = ({ selectedCourse, selectedLesson, lessons, onSelectLesson }) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (!selectedLesson) return <div className="flex-1 flex items-center justify-center">Select a lesson to view content.</div>;
    console.log(lessons)
    
    let currentIndex = lessons.indexOf(selectedLesson);
    let prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
    let nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

    useEffect(() => {
        console.log(lessons)
        currentIndex = lessons.indexOf(selectedLesson);
        prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
        nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
    },
     [lessons, selectedLesson]);
    
    return (
        <div className="flex-1 flex flex-col p-4 h-screen">
            <h2 className="text-xl font-bold mb-4">Lesson: {selectedLesson.replace(/_/g, " ")}</h2>
            <iframe
                src={`${baseUrl}/courses/${selectedCourse}/${selectedLesson}`}
                className="flex-grow w-full h-full border rounded-lg shadow-md"
            />
            <div className="mt-4 flex justify-between">
                {prevLesson && (
                    <button onClick={() => onSelectLesson(prevLesson)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Previous</button>
                )}
                {nextLesson && (
                    <button onClick={() => onSelectLesson(nextLesson)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-auto">Next</button>
                )}
            </div>
        </div>
    );
};