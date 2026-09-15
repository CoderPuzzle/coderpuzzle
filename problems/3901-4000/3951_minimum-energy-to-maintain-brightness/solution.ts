function minEnergy(n: number, brightness: number, intervals: number[][]): number {
    const bulbs = Math.ceil(brightness / 3);
    const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
    const merged: number[][] = [];
    for (const [start, end] of sorted) {
        if (merged.length > 0 && start <= merged[merged.length - 1][1] + 1) {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end);
        } else {
            merged.push([start, end]);
        }
    }
    let activeTime = 0;
    for (const [start, end] of merged) activeTime += end - start + 1;
    return bulbs * activeTime;
}
