function filterOccupiedIntervals(occupiedIntervals: number[][], freeStart: number, freeEnd: number): number[][] {
    const sorted = [...occupiedIntervals].sort((a, b) => a[0] - b[0]);
    const merged: number[][] = [];
    for (const [start, end] of sorted) {
        if (merged.length > 0 && start <= merged[merged.length - 1][1] + 1) {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end);
        } else {
            merged.push([start, end]);
        }
    }

    const answer: number[][] = [];
    for (const [start, end] of merged) {
        if (freeEnd < start || freeStart > end) {
            answer.push([start, end]);
        } else {
            if (freeStart > start) answer.push([start, freeStart - 1]);
            if (freeEnd < end) answer.push([freeEnd + 1, end]);
        }
    }
    return answer;
}
