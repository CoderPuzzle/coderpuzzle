function intervalIntersection(firstList: number[][], secondList: number[][]): number[][] {
    const result: number[][] = [];
    let i = 0;
    let j = 0;
    while (i < firstList.length && j < secondList.length) {
        // The overlap of the two current intervals is [max starts,
        // min ends]; lo <= hi means they intersect (closed intervals,
        // so touching endpoints still count).
        const lo = Math.max(firstList[i][0], secondList[j][0]);
        const hi = Math.min(firstList[i][1], secondList[j][1]);
        if (lo <= hi) {
            result.push([lo, hi]);
        }
        // Retire the interval that ends earlier: later intervals in the
        // other list start strictly after its end, so it is done forever.
        if (firstList[i][1] < secondList[j][1]) {
            i++;
        } else {
            j++;
        }
    }
    return result;
}
