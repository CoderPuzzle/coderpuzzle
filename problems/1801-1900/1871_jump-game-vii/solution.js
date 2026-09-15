/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
var canReach = function (s, minJump, maxJump) {
    // Every reachable i contributes the interval [i+minJump, i+maxJump],
    // so "some source reaches j" is a range-count query; a rolling
    // prefix sum over reach[] answers it in O(1) per position.
    const n = s.length;
    const pre = new Array(n + 1).fill(0);
    pre[1] = 1; // index 0 is reachable by definition
    for (let i = 1; i < n; i++) {
        let ok = false;
        if (s[i] === "0" && i >= minJump) {
            const hi = i - minJump;
            const lo = Math.max(i - maxJump, 0);
            ok = pre[hi + 1] - pre[lo] > 0;
        }
        pre[i + 1] = pre[i] + (ok ? 1 : 0);
    }
    return pre[n] > pre[n - 1];
};
