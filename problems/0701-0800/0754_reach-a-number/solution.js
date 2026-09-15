/**
 * @param {number} target
 * @return {number}
 */
var reachNumber = function (target) {
    // Reversing every move maps a path to target onto a path to -target,
    // so only |target| matters. Walking right for k moves lands on the
    // triangular sum T = k(k+1)/2; flipping move i to the left lowers the
    // total by exactly 2i, so an even overshoot T - |target| is repaired
    // without extra moves while an odd one never is. Take the first k
    // whose T reaches |target| with an even overshoot — advancing k one
    // step adds k+1 to T, flipping parity within at most two steps. The
    // sum stops just past 1e9, exact as a double far below 2^53.
    const t = Math.abs(target);
    let k = 1;
    let total = 1;
    while (total < t || (total - t) % 2 !== 0) {
        k++;
        total += k;
    }
    return k;
};
