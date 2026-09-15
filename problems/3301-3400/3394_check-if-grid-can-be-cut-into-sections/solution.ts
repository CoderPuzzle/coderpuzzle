function checkValidCuts(n: number, rectangles: number[][]): boolean {
    // Two cuts split the rectangles along one axis exactly when that
    // axis's [start, end] projections fall into three or more groups.
    // Sweep the sorted projections once with a running furthest end:
    // each next start at or beyond it is a gap where a cut can pass
    // (touching edges included), and two such gaps make three groups.
    const hasTwoGaps = (axis: number): boolean => {
        const intervals = rectangles.map((r) => [r[axis], r[axis + 2]]).sort((a, b) => a[0] - b[0]);
        let gaps = 0;
        let reach = intervals[0][1];
        for (let i = 1; i < intervals.length; i++) {
            if (intervals[i][0] >= reach) {
                gaps++;
                if (gaps === 2) {
                    return true;
                }
            }
            if (intervals[i][1] > reach) {
                reach = intervals[i][1];
            }
        }
        return false;
    };
    return hasTwoGaps(0) || hasTwoGaps(1);
}
