/**
 * @param {number[]} nums
 * @return {number[]}
 */
var makeParityAlternating = function (nums) {
    // Values stay within ±10^9 and the width within 2 × 10^9, far inside the
    // 2^53 range where plain numbers hold every integer exactly.
    // An alternating array follows one of two templates (even-first or
    // odd-first), and every element fits exactly one of them at its index —
    // so one pass scores both. The template an element matches pins its
    // value; the other pays one operation and may settle at v - 1 or v + 1,
    // whose window the slack bounds v+1 / v-1 enclose.
    const ops = [0, 0];
    const lo = [Infinity, Infinity];
    const hi = [-Infinity, -Infinity];
    for (let i = 0; i < nums.length; i++) {
        const v = nums[i];
        const matched = (v & 1) === (i & 1) ? 0 : 1;
        const missed = 1 - matched;
        ops[missed]++;
        lo[missed] = Math.min(lo[missed], v + 1);
        hi[missed] = Math.max(hi[missed], v - 1);
        lo[matched] = Math.min(lo[matched], v);
        hi[matched] = Math.max(hi[matched], v);
    }
    let best = null;
    for (let t = 0; t < 2; t++) {
        let spread = hi[t] - lo[t];
        if (ops[t] > 0 && spread < 1) {
            // Paying operations means n >= 2 and the final array alternates,
            // so its spread is at least 1; the slack bounds alone can
            // collapse to 0 (nums = [10, 10]).
            spread = 1;
        }
        if (best === null || ops[t] < best[0] || (ops[t] === best[0] && spread < best[1])) {
            best = [ops[t], spread];
        }
    }
    return best;
};
