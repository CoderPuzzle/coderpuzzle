/**
 * @param {number[]} costs
 * @param {number[]} capacity
 * @param {number} budget
 * @return {number}
 */
var maxCapacity = function (costs, capacity, budget) {
    // Costs and capacities are at most 1e5 and budget at most 2e5, so
    // every cost sum stays below budget and every capacity sum is at most
    // 2e5 — far inside both 2^31 and the 2^53 exact range of doubles.
    // Sort the machines by cost with capacities aligned; every affordable
    // pair is then reachable from its dearer machine with a prefix of
    // cheaper partners, so a prefix maximum of capacities answers "best
    // partner" in constant time per machine.
    const machines = costs.map((cost, i) => [cost, capacity[i]]).sort((a, b) => a[0] - b[0]);
    const n = machines.length;
    const sortedCosts = machines.map((m) => m[0]);
    const prefMax = new Array(n).fill(0);
    let run = 0;
    for (let i = 0; i < n; ++i) {
        if (machines[i][1] > run) run = machines[i][1];
        prefMax[i] = run;
    }
    // The empty selection costs 0 < budget (budget >= 1), so 0 is always
    // achievable and the answer only improves from there. Partners are
    // read only from indices before i, so a machine can never pair with
    // itself while every pair is still counted from its dearer end.
    let ans = 0;
    for (let i = 0; i < n; ++i) {
        const cost = machines[i][0];
        const cap = machines[i][1];
        if (cost < budget && cap > ans) ans = cap;
        // Largest j with sortedCosts[j] < budget - cost.
        let lo = 0;
        let hi = n;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (sortedCosts[mid] < budget - cost) lo = mid + 1;
            else hi = mid;
        }
        const t = Math.min(lo - 1, i - 1);
        if (t >= 0 && cap + prefMax[t] > ans) ans = cap + prefMax[t];
    }
    return ans;
};
