/**
 * @param {number[]} nums
 * @return {number}
 */
var minJumps = function (nums) {
    // BFS over indices. When a prime-valued index p is first settled,
    // every index whose value is divisible by p joins the next BFS
    // layer, so the bucket of p is cleared after that single use — any
    // later prime-p index is strictly farther. Buckets are built lazily
    // by walking multiples of p up to max(nums) through a value ->
    // indices table. The queue is an array with a head cursor, since
    // shift() would cost O(n) per pop.
    const n = nums.length;
    if (n === 1) return 0;
    let limit = 0;
    for (const v of nums) if (v > limit) limit = v;
    const isPrime = new Uint8Array(limit + 1).fill(1);
    isPrime[0] = 0;
    if (limit >= 1) isPrime[1] = 0;
    for (let f = 2; f * f <= limit; ++f) {
        if (isPrime[f]) {
            for (let m = f * f; m <= limit; m += f) isPrime[m] = 0;
        }
    }
    const byValue = new Map();
    for (let i = 0; i < n; ++i) {
        const list = byValue.get(nums[i]);
        if (list === undefined) byValue.set(nums[i], [i]);
        else list.push(i);
    }
    const dist = new Array(n).fill(-1);
    dist[0] = 0;
    const queue = [0];
    let head = 0;
    const used = new Set();
    while (head < queue.length) {
        const i = queue[head++];
        const d = dist[i] + 1;
        for (const j of i > 0 ? [i - 1, i + 1] : [1]) {
            if (j < n && dist[j] === -1) {
                dist[j] = d;
                queue.push(j);
            }
        }
        const p = nums[i];
        if (p > 1 && isPrime[p] && !used.has(p)) {
            used.add(p);
            const bucket = [];
            for (let m = p; m <= limit; m += p) {
                const list = byValue.get(m);
                if (list !== undefined) {
                    for (const j of list) bucket.push(j);
                }
            }
            for (const j of bucket) {
                if (dist[j] === -1) {
                    dist[j] = d;
                    queue.push(j);
                }
            }
        }
    }
    return dist[n - 1];
};
