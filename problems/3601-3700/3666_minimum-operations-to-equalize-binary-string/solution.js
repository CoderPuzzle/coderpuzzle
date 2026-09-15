/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minOperations = function (s, k) {
    const n = s.length;
    let z = 0;
    for (const ch of s) {
        if (ch === "0") {
            z++;
        }
    }
    // Only the count z of zeros matters: an operation flips i of the
    // current zeros and k - i of the ones, moving z to z + k - 2 * i
    // for any legal i — one contiguous same-parity range per step.
    if (z === 0) {
        return 0;
    }
    // Next unvisited slot at or after i; path-compresses on the way.
    const find = (nxt, i) => {
        let root = i;
        while (nxt[root] !== root) {
            root = nxt[root];
        }
        while (nxt[i] !== root) {
            const up = nxt[i];
            nxt[i] = root;
            i = up;
        }
        return root;
    };
    // BFS over zero counts 0..n toward 0. Two skip lists (one per parity)
    // hold the unvisited states, so each state enters the queue exactly
    // once even though edges are whole intervals.
    const nextEven = Array.from({ length: Math.floor(n / 2) + 2 }, (_, i) => i);
    const nextOdd = Array.from({ length: Math.floor((n + 1) / 2) + 1 }, (_, i) => i);
    const dist = new Array(n + 1).fill(-1);
    dist[z] = 0;
    const start = z >> 1;
    if (z % 2 === 0) {
        nextEven[start] = start + 1;
    } else {
        nextOdd[start] = start + 1;
    }
    const queue = [z];
    let head = 0;
    while (head < queue.length) {
        const cur = queue[head++];
        const lo = Math.max(0, k - (n - cur));
        const hi = Math.min(k, cur);
        const low = cur + k - 2 * hi;
        const high = cur + k - 2 * lo;
        const p = (cur + k) & 1;
        const nxt = p === 0 ? nextEven : nextOdd;
        const d = dist[cur] + 1;
        let j = find(nxt, low >> 1);
        while (j < nxt.length - 1) {
            const v = 2 * j + p;
            if (v > high) {
                break;
            }
            dist[v] = d;
            if (v === 0) {
                return d;
            }
            nxt[j] = j + 1;
            queue.push(v);
            j = find(nxt, j + 1);
        }
    }
    return -1;
};
