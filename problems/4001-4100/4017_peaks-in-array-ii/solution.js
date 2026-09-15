/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var countOfPeaks = function (nums, queries) {
    const n = nums.length;

    const isPeak = (i) => i > 0 && i < n - 1 && nums[i] > nums[i - 1] && nums[i] > nums[i + 1];

    // The peak set lives implicitly in a Fenwick tree of 0/1 counts whose
    // prefix sums locate predecessors and successors by descent; a second
    // tree holds value[p] = p * (p - prev(p)) for every present peak p.
    // All quantities stay below 2^53, so plain numbers are exact.
    const cnt = new Array(n + 1).fill(0);
    const val = new Array(n + 1).fill(0);
    let total = 0;

    const addCnt = (i, delta) => {
        i += 1;
        while (i <= n) {
            cnt[i] += delta;
            i += i & -i;
        }
    };
    const prefixCnt = (i) => {
        i += 1;
        let t = 0;
        while (i > 0) {
            t += cnt[i];
            i -= i & -i;
        }
        return t;
    };
    const kth = (c) => {
        let pos = 0;
        for (let pw = 1 << 17; pw > 0; pw >>= 1) {
            if (pos + pw <= n && cnt[pos + pw] < c) {
                pos += pw;
                c -= cnt[pos];
            }
        }
        return pos;
    };
    const addVal = (i, delta) => {
        i += 1;
        while (i <= n) {
            val[i] += delta;
            i += i & -i;
        }
    };
    const prefixVal = (i) => {
        i += 1;
        let t = 0;
        while (i > 0) {
            t += val[i];
            i -= i & -i;
        }
        return t;
    };
    const rangeVal = (l, r) => prefixVal(r) - prefixVal(l - 1);

    const insertPeak = (x) => {
        const cPrev = prefixCnt(x - 1);
        const prevP = cPrev > 0 ? kth(cPrev) : 0;
        const cAt = prefixCnt(x);
        const nextP = cAt < total ? kth(cAt + 1) : -1;
        addCnt(x, 1);
        total += 1;
        addVal(x, x * (x - prevP));
        if (nextP >= 0) addVal(nextP, nextP * (nextP - x) - nextP * (nextP - prevP));
    };
    const removePeak = (x) => {
        const cPrev = prefixCnt(x - 1);
        const prevP = cPrev > 0 ? kth(cPrev) : 0;
        const cAt = prefixCnt(x);
        const nextP = cAt < total ? kth(cAt + 1) : -1;
        addCnt(x, -1);
        total -= 1;
        addVal(x, -(x * (x - prevP)));
        if (nextP >= 0) addVal(nextP, nextP * (nextP - prevP) - nextP * (nextP - x));
    };

    for (let i = 1; i + 1 < n; i++) {
        if (isPeak(i)) insertPeak(i);
    }

    const answer = [];
    for (const q of queries) {
        if (q[0] === 1) {
            const l = q[1],
                r = q[2];
            const cA = prefixCnt(l);
            if (cA >= total) {
                answer.push(0);
                continue;
            }
            const a = kth(cA + 1);
            if (a >= r) {
                answer.push(0);
                continue;
            }
            const b = kth(prefixCnt(r - 1));
            const cQ = prefixCnt(a - 1);
            const qv = cQ > 0 ? kth(cQ) : 0;
            const w = rangeVal(a, b);
            answer.push(r * (b - l) - w + a * (l - qv));
        } else {
            const idx = q[1],
                nv = q[2];
            for (let j = idx - 1; j <= idx + 1; j++) {
                if (j >= 0 && j < n && isPeak(j)) removePeak(j);
            }
            nums[idx] = nv;
            for (let j = idx - 1; j <= idx + 1; j++) {
                if (j >= 0 && j < n && isPeak(j)) insertPeak(j);
            }
        }
    }
    return answer;
};
