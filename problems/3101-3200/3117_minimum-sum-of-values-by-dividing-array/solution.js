/**
 * @param {number[]} nums
 * @param {number[]} andValues
 * @return {number}
 */
var minimumValueSum = function (nums, andValues) {
    // Layered DP: g[k] after j rounds = min value sum splitting nums[:k]
    // into exactly j segments matching andValues[:j]. For a fixed right end
    // r the starts l with AND(nums[l..r]) == t form ONE contiguous run
    // inside the classic AND-group list (extending r folds every stored
    // value with nums[r]; equal results merge into one range), so a
    // transition is a range-minimum over the previous layer, served by a
    // small iterative segment tree. Costs stay below m * max(nums) < 10^6,
    // far under 2^53.
    const n = nums.length;
    const INFTY = 1 << 30;

    // Per end index: distinct AND values strictly decreasing alongside
    // their smallest start index. Entry i covers starts [starts[i],
    // starts[i - 1] - 1] (entry 0 up to r).
    const groupVals = [];
    const groupStarts = [];
    let vals = [];
    let starts = [];
    for (let r = 0; r < n; ++r) {
        const x = nums[r];
        const nvals = [x];
        const nstarts = [r];
        for (let i = 0; i < vals.length; ++i) {
            const v = vals[i] & x;
            if (v !== nvals[nvals.length - 1]) {
                nvals.push(v);
                nstarts.push(starts[i]);
            } else {
                // Same value again: the older group's whole start run merges
                // into the current tail, anchored further left (starts arrive
                // in strictly decreasing order).
                nstarts[nstarts.length - 1] = starts[i];
            }
        }
        vals = nvals;
        starts = nstarts;
        groupVals.push(vals.slice());
        groupStarts.push(starts.slice());
    }

    let prev = new Array(n + 1).fill(INFTY);
    prev[0] = 0;
    const size = n + 1;
    for (const target of andValues) {
        const tree = new Array(2 * size).fill(INFTY);
        for (let k = 0; k < size; ++k) tree[size + k] = prev[k];
        for (let k = size - 1; k > 0; --k) {
            const left = tree[2 * k],
                right = tree[2 * k + 1];
            tree[k] = left < right ? left : right;
        }
        const cur = new Array(n + 1).fill(INFTY);
        for (let r = 0; r < n; ++r) {
            const valsR = groupVals[r];
            const startsR = groupStarts[r];
            let lo = -1;
            let hi = -2;
            for (let gi = 0; gi < valsR.length; ++gi) {
                if (valsR[gi] === target) {
                    lo = startsR[gi];
                    hi = gi > 0 ? startsR[gi - 1] - 1 : r;
                    break;
                }
            }
            if (lo < 0) continue; // this target cannot end at r
            let best = INFTY;
            let l = lo + size,
                rr = hi + 1 + size; // inclusive [lo..hi]
            while (l < rr) {
                if (l & 1) {
                    if (tree[l] < best) best = tree[l];
                    l++;
                }
                if (rr & 1) {
                    rr--;
                    if (tree[rr] < best) best = tree[rr];
                }
                l >>= 1;
                rr >>= 1;
            }
            if (best < INFTY) cur[r + 1] = best + nums[r];
        }
        prev = cur;
    }

    return prev[n] < INFTY ? prev[n] : -1;
};
