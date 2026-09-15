/**
 * @param {number[]} milestones
 * @return {number}
 */
var numberOfWeeks = function (milestones) {
    // Only the largest project can block the schedule: every milestone of
    // the other projects acts as a separator letting one extra milestone of
    // the largest project be placed without adjacency. If rest (all other
    // milestones) is at least mx - 1, every milestone is schedulable (total
    // weeks); otherwise the best is rest separator-and-large pairs plus one
    // final large milestone, i.e. 2 * rest + 1 weeks. Totals stay within
    // 1e5 * 1e9 = 1e14 < 2^53, so plain Number arithmetic is exact.
    let total = 0;
    let mx = 0;
    for (const m of milestones) {
        total += m;
        if (m > mx) mx = m;
    }
    const rest = total - mx;
    return Math.min(total, 2 * rest + 1);
};
