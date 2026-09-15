function maxStudentsOnBench(students: number[][]): number {
    // Mark (bench, student) pairs in a fixed grid; the first sight of a
    // pair is the only one that bumps its bench's unique count.
    const seen = Array.from({ length: 101 }, () => new Array<boolean>(101).fill(false));
    const count = new Array<number>(101).fill(0);
    for (const [studentId, benchId] of students) {
        if (!seen[benchId][studentId]) {
            seen[benchId][studentId] = true;
            count[benchId]++;
        }
    }
    return Math.max(...count);
}
