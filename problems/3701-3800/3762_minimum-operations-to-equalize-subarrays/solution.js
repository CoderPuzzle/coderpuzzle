/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */
var minOperations = function (nums, k, queries) {
    const n = nums.length;
    // Remainder runs: a window is equalizable iff it sits inside one
    // maximal run of equal remainders, i.e. iff l and r share a mark.
    const run = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        run[i] = run[i - 1] + (nums[i] % k !== nums[i - 1] % k ? 1 : 0);
    }
    const quot = nums.map((value) => Math.floor(value / k));
    // Merge sort tree over the quotients: each node keeps its values
    // sorted plus prefix sums of that order.
    const treeVals = new Array(4 * n).fill(null);
    const treePref = new Array(4 * n).fill(null);
    (function build(node, lo, hi) {
        if (lo === hi) {
            treeVals[node] = [quot[lo]];
            treePref[node] = [0, quot[lo]];
            return;
        }
        const mid = (lo + hi) >> 1;
        build(2 * node, lo, mid);
        build(2 * node + 1, mid + 1, hi);
        const merged = [...treeVals[2 * node], ...treeVals[2 * node + 1]].sort((a, b) => a - b);
        const pref = [0];
        for (const value of merged) {
            pref.push(pref[pref.length - 1] + value);
        }
        treeVals[node] = merged;
        treePref[node] = pref;
    })(1, 0, n - 1);
    let pieceVals = [];
    let piecePref = [];
    function countLeSumLe(x) {
        let count = 0,
            total = 0;
        for (let idx = 0; idx < pieceVals.length; idx++) {
            const vec = pieceVals[idx];
            let low = 0,
                high = vec.length;
            while (low < high) {
                const mid = (low + high) >> 1;
                if (vec[mid] <= x) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            count += low;
            total += piecePref[idx][low];
        }
        return [count, total];
    }
    const answers = [];
    for (const [l, r] of queries) {
        if (run[l] !== run[r]) {
            answers.push(-1);
            continue;
        }
        // Decompose the window into tree nodes; the set stays fixed for
        // the whole query.
        pieceVals = [];
        piecePref = [];
        const stack = [[1, 0, n - 1]];
        while (stack.length > 0) {
            const [node, lo, hi] = stack.pop();
            if (r < lo || hi < l) continue;
            if (l <= lo && hi <= r) {
                pieceVals.push(treeVals[node]);
                piecePref.push(treePref[node]);
                continue;
            }
            const mid = (lo + hi) >> 1;
            stack.push([2 * node, lo, mid]);
            stack.push([2 * node + 1, mid + 1, hi]);
        }
        // Smallest quotient whose inclusive rank reaches the lower median.
        const need = (r - l + 2) >> 1;
        let lo = Infinity,
            hi = -Infinity;
        for (const vec of pieceVals) {
            lo = Math.min(lo, vec[0]);
            hi = Math.max(hi, vec[vec.length - 1]);
        }
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            const [count] = countLeSumLe(mid);
            if (count >= need) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        const median = lo;
        const size = r - l + 1;
        const [atCount, atSum] = countLeSumLe(median);
        const [belowCount, belowSum] = countLeSumLe(median - 1);
        let grandTotal = 0;
        for (const pref of piecePref) {
            grandTotal += pref[pref.length - 1];
        }
        // Below-median elements climb by their shortfall; above-median
        // ones descend by their excess; equals cost nothing.
        answers.push(median * belowCount - belowSum + (grandTotal - atSum - median * (size - atCount)));
    }
    return answers;
};
