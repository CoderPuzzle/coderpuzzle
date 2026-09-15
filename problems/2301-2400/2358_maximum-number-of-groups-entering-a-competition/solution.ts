function maximumGroups(grades: number[]): number {
    const n = grades.length;
    const root = Math.floor(Math.sqrt(8 * n + 1));
    return Math.floor((root - 1) / 2);
}
