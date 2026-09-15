function maxWalls(robots: number[], distance: number[], walls: number[]): number {
    // Sort robots by position (carrying each range along) and sort the wall
    // positions once: every reachable set below is then counted with two
    // binary searches instead of a scan. The numeric comparators are
    // load-bearing — the default sort is lexicographic.
    const bots = robots.map((pos, i): [number, number] => [pos, distance[i]]).sort((a, b) => a[0] - b[0]);
    walls.sort((a, b) => a - b);
    // First index whose wall is >= value.
    const lowerBound = (arr: number[], value: number): number => {
        let lo = 0,
            hi = arr.length;
        while (lo < hi) {
            const mid = lo + ((hi - lo) >> 1);
            if (arr[mid] < value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };
    // How many walls lie in the closed interval [lo, hi].
    const count = (lo: number, hi: number): number => {
        if (lo > hi) {
            return 0;
        }
        return lowerBound(walls, hi + 1) - lowerBound(walls, lo);
    };
    // Firing left the bullet stops at the previous robot; a wall on the
    // blocker's position survives (only the blocker itself can destroy it).
    const leftLo = (i: number): number =>
        i === 0 ? bots[i][0] - bots[i][1] : Math.max(bots[i][0] - bots[i][1], bots[i - 1][0] + 1);
    // Firing right the bullet stops at the next robot.
    const rightHi = (i: number): number =>
        i + 1 === bots.length ? bots[i][0] + bots[i][1] : Math.min(bots[i][0] + bots[i][1], bots[i + 1][0] - 1);
    // prevLeft / prevRight: best totals for the robots already decided when
    // the last of them fired left / right.
    let prevLeft = count(leftLo(0), bots[0][0]);
    let prevRight = count(bots[0][0], rightHi(0));
    for (let i = 1; i < bots.length; i++) {
        const pos = bots[i][0];
        const hereLeft = count(leftLo(i), pos);
        const hereRight = count(pos, rightHi(i));
        // Facing shots share the gap: when this robot fires left and the
        // previous one fired right, the walls both bullets reach were
        // already counted and must not count twice.
        const shared = count(leftLo(i), Math.min(bots[i - 1][0] + bots[i - 1][1], pos - 1));
        const best = Math.max(prevLeft, prevRight);
        prevLeft = Math.max(prevLeft + hereLeft, prevRight + hereLeft - shared);
        // A rightward shot can never overlap anything already decided.
        prevRight = best + hereRight;
    }
    return Math.max(prevLeft, prevRight);
}
