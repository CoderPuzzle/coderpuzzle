/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var maximumCount = function (nums, queries) {
    // A prime counts on both sides of a split at k exactly when k lies in
    // [first + 1, last] of its occurrence indices, so every query answer is
    // (distinct primes present) + (deepest interval overlap). Each prime
    // value keeps a sorted list of its occurrence indices, and an interval
    // entering or leaving is two point updates in a max-prefix segment tree
    // over the split positions (+1 at first+1, -1 at last+1): the root
    // stores the largest prefix sum of the event array, i.e. the best
    // overlap, and the update work per query is a constant number of
    // interval insertions and removals.
    const LIMIT = 100001;
    const isPrime = new Uint8Array(LIMIT).fill(1);
    isPrime[0] = isPrime[1] = 0;
    for (let i = 2; i * i < LIMIT; ++i) {
        if (isPrime[i]) {
            for (let j = i * i; j < LIMIT; j += i) {
                isPrime[j] = 0;
            }
        }
    }
    const n = nums.length;
    let size = 1;
    while (size < n) {
        size <<= 1;
    }
    const segSum = new Int32Array(2 * size);
    const segBest = new Int32Array(2 * size);
    const cur = [...nums];
    const occ = new Map();
    let distinct = 0;
    for (let i = 0; i < n; ++i) {
        const v = cur[i];
        if (isPrime[v]) {
            if (!occ.has(v)) {
                occ.set(v, []);
                ++distinct;
            }
            occ.get(v).push(i);
        }
    }
    const addEvent = (pos, delta) => {
        let u = size + pos - 1;
        segSum[u] += delta;
        segBest[u] = segSum[u] > 0 ? segSum[u] : 0;
        for (u >>= 1; u > 0; u >>= 1) {
            const left = u + u;
            segSum[u] = segSum[left] + segSum[left + 1];
            const cross = segSum[left] + segBest[left + 1];
            segBest[u] = cross > segBest[left] ? cross : segBest[left];
        }
    };
    const events = (idxs, sign) => {
        addEvent(idxs[0] + 1, sign);
        addEvent(idxs[idxs.length - 1] + 1, -sign);
    };
    for (const idxs of occ.values()) {
        if (idxs.length >= 2) {
            events(idxs, 1);
        }
    }
    const lowerBound = (lst, target) => {
        let lo = 0,
            hi = lst.length;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (lst[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };
    const answers = [];
    for (const [idx, val] of queries) {
        const old = cur[idx];
        if (old !== val) {
            if (isPrime[old]) {
                const lst = occ.get(old);
                if (lst.length >= 2) {
                    events(lst, -1);
                }
                lst.splice(lowerBound(lst, idx), 1);
                if (lst.length === 0) {
                    occ.delete(old);
                    --distinct;
                } else if (lst.length >= 2) {
                    events(lst, 1);
                }
            }
            if (isPrime[val]) {
                let lst = occ.get(val);
                if (lst !== undefined && lst.length >= 2) {
                    events(lst, -1);
                }
                if (lst === undefined) {
                    lst = [];
                    occ.set(val, lst);
                    ++distinct;
                }
                lst.splice(lowerBound(lst, idx), 0, idx);
                if (lst.length >= 2) {
                    events(lst, 1);
                }
            }
            cur[idx] = val;
        }
        answers.push(distinct + segBest[1]);
    }
    return answers;
};
