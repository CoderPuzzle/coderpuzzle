/**
 * @param {number[][]} students
 * @param {number[][]} mentors
 * @return {number}
 */
var maxCompatibilitySum = function (students, mentors) {
    const m = students.length;
    // Precompute the m x m agreement counts so the DP touches only ints.
    const score = [];
    for (let i = 0; i < m; i++) {
        score.push([]);
        for (let j = 0; j < m; j++) {
            let s = 0;
            for (let t = 0; t < students[i].length; t++) {
                if (students[i][t] === mentors[j][t]) s++;
            }
            score[i].push(s);
        }
    }
    const full = 1 << m;
    // dp[mask] = best total score matching the first popcount(mask) students
    // to exactly the mentors in mask; dp[0] = 0. The used-mentor count alone
    // pins down which student is placed next. Increasing numeric order works
    // because every submask is numerically smaller.
    const dp = new Array(full).fill(0);
    for (let mask = 1; mask < full; mask++) {
        // Counting set bits up to m yields i = popcount(mask) - 1.
        let i = -1;
        for (let b = 0; b < m; b++) if ((mask >> b) & 1) i++;
        let best = 0;
        for (let j = 0; j < m; j++) {
            if ((mask >> j) & 1) {
                // Mentor j was this student's match: extend the assignment
                // without j by their pairwise score.
                const v = dp[mask ^ (1 << j)] + score[i][j];
                if (v > best) best = v;
            }
        }
        dp[mask] = best;
    }
    return dp[full - 1];
};
