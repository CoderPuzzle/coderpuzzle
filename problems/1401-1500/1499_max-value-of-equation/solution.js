/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number}
 */
var findMaxValueOfEquation = function (points, k) {
    const n = points.length;
    // x is sorted increasing, so for i < j the equation value is
    // yj + xj + (yi - xi): the best partner maximizes the key y - x,
    // turning this into a sliding-window max over that key (deque kept
    // with y - x strictly decreasing, front = best candidate)
    const dq = new Array(n).fill(0);
    let head = 0;
    let tail = 0;
    let best = -Infinity;
    for (let j = 0; j < n; j++) {
        const xj = points[j][0];
        const yj = points[j][1];
        // drop stale front: x only grows, so anything beyond k behind
        // the current j is beyond k for every later j too
        while (head < tail && xj - points[dq[head]][0] > k) {
            head++;
        }
        if (head < tail) {
            const [xi, yi] = points[dq[head]];
            const value = yj + yi + xj - xi;
            if (value > best) {
                best = value;
            }
        }
        // a back entry with key <= newcomer's can never win a future j;
        // popping ties is safe — the newer index has larger x, so it
        // stays inside the k-window at least as long
        while (head < tail && points[dq[tail - 1]][1] - points[dq[tail - 1]][0] <= yj - xj) {
            tail--;
        }
        dq[tail++] = j;
    }
    return best;
};
