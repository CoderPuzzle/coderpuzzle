/**
 * @param {number} n
 * @param {number[][]} relations
 * @param {number} k
 * @return {number}
 */
var minNumberOfSemesters = function (n, relations, k) {
    // prereq[i] = bitmask of courses that must precede course i.
    const prereq = new Array(n).fill(0);
    for (const [prev, nxt] of relations) {
        prereq[nxt - 1] |= 1 << (prev - 1);
    }
    const full = (1 << n) - 1;
    // dp[mask] = min semesters to have taken exactly the courses in mask.
    // Every transition only adds bits, so the target mask is numerically
    // larger — increasing order finalizes every predecessor first.
    // The n+1 sentinel parks unreachable states.
    const unreachable = n + 1;
    const dp = new Array(full + 1).fill(unreachable);
    dp[0] = 0;

    const relax = (state, candidate) => {
        if (candidate < dp[state]) {
            dp[state] = candidate;
        }
    };
    // Enumerate every exactly-need-sized subset of bits[start..] by recursion.
    const choose = (bits, start, need, taken, steps) => {
        if (need === 0) {
            relax(taken, steps + 1);
            return;
        }
        for (let i = start; i + need <= bits.length; i++) {
            choose(bits, i + 1, need - 1, taken | (1 << bits[i]), steps);
        }
    };

    for (let mask = 0; mask < full; mask++) {
        if (dp[mask] === unreachable) {
            continue;
        }
        // Available = untaken courses whose prerequisite set already sits
        // inside mask (one AND per course).
        let avail = 0;
        for (let course = 0; course < n; course++) {
            if (((mask >> course) & 1) === 0 && (prereq[course] & ~mask) === 0) {
                avail |= 1 << course;
            }
        }
        if (avail === 0) {
            continue;
        }
        const bits = [];
        for (let course = 0; course < n; course++) {
            if (((avail >> course) & 1) === 1) {
                bits.push(course);
            }
        }
        // Fewer than k available: take them all in a single semester.
        if (bits.length <= k) {
            relax(mask | avail, dp[mask] + 1);
        } else {
            // Taking an extra available course never hurts, so only
            // semesters that take exactly k courses need examining.
            choose(bits, 0, k, mask, dp[mask]);
        }
    }
    return dp[full];
};
