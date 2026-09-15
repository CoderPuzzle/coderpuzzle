/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
    // Smash order is irrelevant: the last stone is a signed sum, so the
    // task is a two-group partition minimizing the difference of sums.
    let total = 0;
    for (const s of stones) {
        total += s;
    }
    // With group A + group B = total fixed, minimizing total - 2*sum(A)
    // means pushing sum(A) as close to total/2 as possible.
    const target = Math.floor(total / 2);
    const reachable = new Array(target + 1).fill(false);
    reachable[0] = true;
    for (const value of stones) {
        // Descend so a stone can't be counted twice in the same sum.
        for (let s = target; s >= value; s--) {
            if (reachable[s - value]) {
                reachable[s] = true;
            }
        }
    }
    // Largest reachable subset sum at most target.
    let best = 0;
    for (let s = target; s >= 0; s--) {
        if (reachable[s]) {
            best = s;
            break;
        }
    }
    return total - 2 * best;
};
