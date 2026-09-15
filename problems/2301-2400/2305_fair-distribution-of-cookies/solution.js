/**
 * @param {number[]} cookies
 * @param {number} k
 * @return {number}
 */
var distributeCookies = function (cookies, k) {
    const children = new Array(k).fill(0);
    let best = Infinity;

    function backtrack(i, curMax) {
        // bound pruning: the running max only grows, so this branch can no
        // longer beat the best complete distribution found so far
        if (curMax >= best) return;
        // all bags placed: the running max is this leaf's unfairness
        if (i === cookies.length) {
            best = curMax;
            return;
        }
        const tried = new Set();
        for (let j = 0; j < k; j++) {
            // symmetry: children holding equal totals are interchangeable,
            // so try each distinct total only once
            if (tried.has(children[j])) continue;
            tried.add(children[j]);
            children[j] += cookies[i];
            backtrack(i + 1, Math.max(curMax, children[j]));
            children[j] -= cookies[i];
        }
    }

    backtrack(0, 0);
    return best;
};
