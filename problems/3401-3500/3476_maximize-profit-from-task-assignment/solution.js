/**
 * @param {number[]} workers
 * @param {number[][]} tasks
 * @return {number}
 */
var maxProfit = function (workers, tasks) {
    // Skills partition the problem: inside one skill class every worker
    // is interchangeable and can take any task of that class, so the k
    // workers of a skill simply claim its k most profitable tasks. The
    // extra worker then claims the best leftover overall. The total is
    // at most (10^5 + 1) * 10^9 ~= 10^14 < 2^53, exact as JS numbers.
    const counts = new Map();
    for (const w of workers) counts.set(w, (counts.get(w) || 0) + 1);
    const groups = new Map();
    for (const [req, profit] of tasks) {
        if (!groups.has(req)) groups.set(req, []);
        groups.get(req).push(profit);
    }
    let total = 0;
    let bestExtra = 0;
    for (const [skill, profits] of groups) {
        profits.sort((a, b) => b - a);
        const take = Math.min(counts.get(skill) || 0, profits.length);
        for (let i = 0; i < take; ++i) total += profits[i];
        if (take < profits.length && profits[take] > bestExtra) bestExtra = profits[take];
    }
    return total + bestExtra;
};
