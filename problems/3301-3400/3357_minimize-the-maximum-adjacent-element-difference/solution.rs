impl Solution {
    // Binary search the answer d and probe feasibility. A probe checks the
    // unchangeable adjacent known pairs, then every maximal run of -1s.
    // Order the pair as x <= y: a run between lo <= hi accepts x alone, y
    // alone (a value within d of both ends), or — with two or more missing
    // cells — a straddle (x within d of lo, y within d of hi). "Far" mode
    // stabs every run's both-end interval with two free values; "close"
    // mode slides a pair with y - x <= d over candidate spots and
    // intersects the one interval each run leaves for y. Reach values hit
    // ~4*10^9 which overflows i32, so the interval math lives in i64; the
    // answer itself is < 10^9.
    pub fn min_difference(nums: Vec<i32>) -> i32 {
        let mut known_count = 0i64;
        let mut mn = i64::MAX;
        let mut mx = i64::MIN;
        let mut runs: Vec<(i64, i64, bool, i64)> = Vec::new();
        let (mut prev, mut run) = (0i64, 0i64);
        for &v in &nums {
            if v == -1 {
                run += 1;
                continue;
            }
            known_count += 1;
            mn = mn.min(v as i64);
            mx = mx.max(v as i64);
            if run != 0 {
                if prev != 0 {
                    runs.push(((prev.min(v as i64)), prev.max(v as i64), false, run));
                } else {
                    runs.push((v as i64, v as i64, true, run));
                }
                run = 0;
            }
            prev = v as i64;
        }
        if run != 0 {
            runs.push((prev, prev, true, run));
        }
        if known_count < 2 {
            return 0; // fill everything with the single known value (or 1)
        }
        let mut known_adj = 0i64;
        for w in nums.windows(2) {
            if w[0] != -1 && w[1] != -1 {
                known_adj = known_adj.max((w[0] as i64 - w[1] as i64).abs());
            }
        }
        let feasible = |d: i64| -> bool {
            if d < known_adj {
                return false;
            }
            // FAR: two stabbers for every run's both-end interval
            let mut broken = false;
            let mut ivs: Vec<(i64, i64)> = Vec::new();
            for &(lo, hi, one, _) in &runs {
                let a = if one { lo - d } else { hi - d };
                if a > lo + d {
                    broken = true;
                    break;
                }
                ivs.push((a, lo + d));
            }
            if !broken {
                if ivs.is_empty() {
                    return true; // no runs: known pairs were the only bound
                }
                ivs.sort_by_key(|t| t.1);
                let p = ivs[0].1; // classic right-endpoint stab
                let rest: Vec<&(i64, i64)> = ivs.iter().filter(|&&(a, b)| a > p || p > b).collect();
                if rest.is_empty() {
                    return true;
                }
                let q = rest[0].1;
                if rest.iter().all(|&&(a, b)| a <= q && q <= b) {
                    return true;
                }
            }
            // CLOSE: y - x <= d; intersect the interval each run leaves for y
            let mut cand: Vec<i64> = vec![1];
            for &(lo, hi, _, _) in &runs {
                cand.push(lo - d);
                cand.push(lo + d);
                cand.push(lo - 2 * d);
                cand.push(hi - d);
                cand.push(hi + d);
                cand.push(hi - 2 * d);
            }
            cand.sort_unstable();
            for &x in &cand {
                if x < 1 {
                    continue;
                }
                let (mut glo, mut ghi) = (1i64, 4_000_000_000i64);
                let mut ok = true;
                for &(lo, hi, one, ln) in &runs {
                    let jlo = if one { lo - d } else { hi - d };
                    let jhi = lo + d;
                    if jlo <= x && x <= jhi {
                        continue; // x alone covers this run
                    }
                    let (alo, ahi) = if !one && ln >= 2 && lo - d <= x && x <= lo + d {
                        (hi - d, hi + d) // straddle: y takes the far end
                    } else {
                        (jlo, jhi) // y must cover both ends
                    };
                    if alo > ahi {
                        ok = false;
                        break;
                    }
                    glo = glo.max(alo);
                    ghi = ghi.min(ahi);
                    if glo > ghi {
                        ok = false;
                        break;
                    }
                }
                if ok && glo <= x + d && ghi >= x {
                    return true;
                }
            }
            false
        };
        let (mut lo, mut hi) = (0i64, mx - mn);
        while lo < hi {
            let mid = (lo + hi) / 2;
            if feasible(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
