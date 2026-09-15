/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var subarrayMajority = function (nums, queries) {
    const n = nums.length;
    // Rank-compress: "smallest value" becomes "smallest rank".
    const values = nums.slice().sort((x, y) => x - y);
    let m = 0;
    for (let i = 0; i < n; i++) {
        if (i === 0 || values[i] !== values[i - 1]) {
            values[m++] = values[i];
        }
    }
    const rankOf = function (value) {
        let lo = 0,
            hi = m;
        while (lo < hi) {
            const mid = lo + ((hi - lo) >> 1);
            if (values[mid] < value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
        a[i] = rankOf(nums[i]);
    }
    // occ[x] lists the sorted positions of rank x, so any range frequency is
    // two binary searches.
    const occ = Array.from({ length: m }, () => []);
    for (let pos = 0; pos < n; pos++) {
        occ[a[pos]].push(pos);
    }

    // Block size balancing the block-pair sweep against query fringes.
    let s = Math.floor(Math.sqrt(queries.length));
    while ((s + 1) * (s + 1) <= queries.length) {
        s++;
    }
    const b = Math.max(1, Math.floor(n / s));
    const k = Math.floor((n + b - 1) / b);
    // topF[i*k+j] / topV[i*k+j]: highest frequency inside blocks i..j and the
    // smallest rank attaining it. One sweep per left block grows the window
    // additions-only, so counts never decrease and the mode pair stays O(1)
    // per element.
    const topF = new Array(k * k).fill(0);
    const topV = new Array(k * k).fill(0);
    const cnt = new Array(m).fill(0);
    for (let i = 0; i < k; i++) {
        cnt.fill(0);
        let mf = 0,
            mv = 0,
            pos = i * b;
        for (let j = i; j < k; j++) {
            const end = Math.min((j + 1) * b, n);
            for (; pos < end; pos++) {
                const x = a[pos];
                const c = ++cnt[x];
                if (c > mf) {
                    mf = c;
                    mv = x;
                } else if (c === mf && x < mv) {
                    mv = x;
                }
            }
            topF[i * k + j] = mf;
            topV[i * k + j] = mv;
        }
    }

    // The overall top element clears any threshold exactly when something
    // does, so every answer is that element's pair checked once.
    const stamp = new Array(m).fill(0);
    const freq = new Array(m).fill(0);
    const seen = [];
    let token = 0;
    const out = [];
    for (const query of queries) {
        const l = query[0],
            r = query[1],
            t = query[2];
        const bl = Math.floor(l / b),
            br = Math.floor(r / b);
        token++;
        let bf, bv;
        if (br - bl <= 1) {
            // Range spans at most two blocks: count it directly.
            bf = 0;
            bv = 0;
            for (let pos = l; pos <= r; pos++) {
                const x = a[pos];
                if (stamp[x] !== token) {
                    stamp[x] = token;
                    freq[x] = 1;
                } else {
                    freq[x]++;
                }
                const c = freq[x];
                if (c > bf) {
                    bf = c;
                    bv = x;
                } else if (c === bf && x < bv) {
                    bv = x;
                }
            }
        } else {
            // Whole blocks give the base candidate; every distinct fringe rank
            // gets its exact range frequency from two binary searches (its
            // total count also spans the middle blocks, so fringe counts alone
            // can never prune it).
            const idx = (bl + 1) * k + br - 1;
            bf = topF[idx];
            bv = topV[idx];
            seen.length = 0;
            for (let pos = l; pos < (bl + 1) * b; pos++) {
                const x = a[pos];
                if (stamp[x] !== token) {
                    stamp[x] = token;
                    seen.push(x);
                }
            }
            for (let pos = br * b; pos <= r; pos++) {
                const x = a[pos];
                if (stamp[x] !== token) {
                    stamp[x] = token;
                    seen.push(x);
                }
            }
            for (const x of seen) {
                const list = occ[x];
                const f = upperBound(list, r) - lowerBound(list, l);
                if (f > bf || (f === bf && x < bv)) {
                    bf = f;
                    bv = x;
                }
            }
        }
        out.push(bf >= t ? values[bv] : -1);
    }
    return out;
};

var lowerBound = function (list, target) {
    let lo = 0,
        hi = list.length;
    while (lo < hi) {
        const mid = lo + ((hi - lo) >> 1);
        if (list[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
};

var upperBound = function (list, target) {
    let lo = 0,
        hi = list.length;
    while (lo < hi) {
        const mid = lo + ((hi - lo) >> 1);
        if (list[mid] <= target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
};
