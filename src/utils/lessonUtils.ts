export function sortLessons(data: string[]): string[] {
    return data.sort((a, b) => {
        const extractNumber = (str: string): number => {
            const cleanedStr = str.replace(/^[._]+/, ""); // Remove leading '.' or '_'
            const match = cleanedStr.match(/^\d+/);
            return match ? parseInt(match[0], 10) || 0 : 0;
        };
        return extractNumber(a) - extractNumber(b);
    });
}
