function visibleMountains(peaks: number[][]): number {
    // Mountain (x, y) contains peak (a, b) exactly when |a - x| <= y - b:
    // the peak sits inside or on the slopes. Sorting by x ascending (ties
    // by y descending) puts every potential coverer no later, so a
    // monotonic stack settles everything in one pass. Duplicated peaks are
    // invisible but still hide others, so they stay on the stack for their
    // covering effect and are only excluded from the final count.
    peaks.sort((p, q) => (p[0] !== q[0] ? p[0] - q[0] : q[1] - p[1]));
    const stack: Array<[number, number, number]> = []; // entries: [x, y, counted]
    let i = 0;
    while (i < peaks.length) {
        let j = i; // run-length encode equal peaks to detect duplicates
        while (j < peaks.length && peaks[j][0] === peaks[i][0] && peaks[j][1] === peaks[i][1]) {
            ++j;
        }
        const duplicated = j - i > 1;
        const x = peaks[i][0];
        const y = peaks[i][1];
        while (stack.length > 0 && Math.abs(stack[stack.length - 1][0] - x) <= y - stack[stack.length - 1][1]) {
            stack.pop();
        }
        const covered = stack.length > 0 && Math.abs(x - stack[stack.length - 1][0]) <= stack[stack.length - 1][1] - y;
        if (!covered) {
            stack.push([x, y, duplicated ? 0 : 1]);
        }
        i = j;
    }
    let visible = 0;
    for (const entry of stack) {
        visible += entry[2];
    }
    return visible;
}
