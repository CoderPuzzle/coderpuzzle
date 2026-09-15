/**
 * @param {number[]} nums
 * @return {number}
 */
var minDifference = function (nums) {
    // Binary search the answer d and probe feasibility. A probe checks the
    // unchangeable adjacent known pairs, then every maximal run of -1s.
    // Order the pair as x <= y: a run between lo <= hi accepts x alone, y
    // alone (a value within d of both ends), or — with two or more missing
    // cells — a straddle (x within d of lo, y within d of hi). "Far" mode
    // stabs every run's both-end interval with two free values; "close"
    // mode slides a pair with y - x <= d over candidate spots and
    // intersects the one interval each run leaves for y. All interval
    // values stay within 4e9 in magnitude — far below 2^53, so Number
    // arithmetic is exact.
    const knowns = nums.filter((v) => v !== -1);
    if (knowns.length < 2) {
        return 0; // fill everything with the single known value (or 1)
    }
    // runs: [lo, hi, oneSided, length]; a one-sided run touches an array
    // end, so lo == hi is its single known neighbour
    const runs = [];
    let prev = 0;
    let run = 0;
    for (const v of nums) {
        if (v === -1) {
            run++;
            continue;
        }
        if (run !== 0) {
            if (prev !== 0) {
                runs.push([Math.min(prev, v), Math.max(prev, v), 0, run]);
            } else {
                runs.push([v, v, 1, run]);
            }
            run = 0;
        }
        prev = v;
    }
    if (run !== 0) {
        runs.push([prev, prev, 1, run]);
    }
    let knownAdj = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] !== -1 && nums[i] !== -1) {
            knownAdj = Math.max(knownAdj, Math.abs(nums[i] - nums[i - 1]));
        }
    }
    const feasible = (d) => {
        if (d < knownAdj) {
            return false;
        }
        // FAR: two stabbers for every run's both-end interval
        let broken = false;
        const ivs = [];
        for (const [lo, hi, one] of runs) {
            const a = one === 1 ? lo - d : hi - d;
            if (a > lo + d) {
                broken = true;
                break;
            }
            ivs.push([a, lo + d]);
        }
        if (!broken) {
            if (ivs.length === 0) {
                return true; // no runs: known pairs were the only bound
            }
            ivs.sort((u, w) => u[1] - w[1]);
            const p = ivs[0][1]; // classic right-endpoint stab
            const rest = ivs.filter(([a, b]) => a > p || p > b);
            if (rest.length === 0) {
                return true;
            }
            const q = rest[0][1];
            if (rest.every(([a, b]) => a <= q && q <= b)) {
                return true;
            }
        }
        // CLOSE: y - x <= d; intersect the interval each run leaves for y
        const cand = new Set([1]);
        for (const [lo, hi] of runs) {
            cand.add(lo - d);
            cand.add(lo + d);
            cand.add(lo - 2 * d);
            cand.add(hi - d);
            cand.add(hi + d);
            cand.add(hi - 2 * d);
        }
        for (const x of [...cand].sort((u, w) => u - w)) {
            if (x < 1) {
                continue;
            }
            let glo = 1;
            let ghi = 4e9;
            let ok = true;
            for (const [lo, hi, one, ln] of runs) {
                const jlo = one === 1 ? lo - d : hi - d;
                const jhi = lo + d;
                if (jlo <= x && x <= jhi) {
                    continue; // x alone covers this run
                }
                let alo;
                let ahi;
                if (one !== 1 && ln >= 2 && lo - d <= x && x <= lo + d) {
                    alo = hi - d;
                    ahi = hi + d; // straddle: y takes the far end
                } else {
                    alo = jlo;
                    ahi = jhi; // y must cover both ends
                }
                if (alo > ahi) {
                    ok = false;
                    break;
                }
                glo = Math.max(glo, alo);
                ghi = Math.min(ghi, ahi);
                if (glo > ghi) {
                    ok = false;
                    break;
                }
            }
            if (ok && glo <= x + d && ghi >= x) {
                return true;
            }
        }
        return false;
    };
    let mn = Infinity;
    let mx = -Infinity;
    for (const v of knowns) {
        if (v < mn) {
            mn = v;
        }
        if (v > mx) {
            mx = v;
        }
    }
    let lo = 0;
    let hi = mx - mn;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (feasible(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
};
