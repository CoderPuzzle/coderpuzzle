impl Solution {
    pub fn max_power(stations: Vec<i32>, r: i32, k: i32) -> i64 {
        let n = stations.len();
        let r = r as usize;
        let k = k as i64;
        // power[i] = initial number of power stations serving city i
        let mut diff = vec![0i64; n + 1];
        for (i, &s) in stations.iter().enumerate() {
            let left = i.saturating_sub(r);
            let right = (i + r).min(n - 1);
            diff[left] += s as i64;
            diff[right + 1] -= s as i64;
        }
        let mut power = vec![0i64; n];
        let mut cur = 0i64;
        for i in 0..n {
            cur += diff[i];
            power[i] = cur;
        }

        let mut min_power = i64::MAX;
        for &p in &power {
            min_power = min_power.min(p);
        }
        let mut extra = vec![0i64; n + 1];

        let feasible = |target: i64, extra: &mut Vec<i64>| -> bool {
            for e in extra.iter_mut() {
                *e = 0;
            }
            let mut cur2 = 0i64;
            let mut used = 0i64;
            for i in 0..n {
                cur2 += extra[i];
                let have = power[i] + cur2;
                if have < target {
                    let need = target - have;
                    used += need;
                    if used > k {
                        return false;
                    }
                    let right = (i + r).min(n - 1);
                    extra[right + 1] -= need;
                    cur2 += need;
                }
            }
            used <= k
        };

        // each new station raises any single city's power by at most 1,
        // so the answer never exceeds min(power) + k
        let mut lo = 0i64;
        let mut hi = min_power + k;
        while lo < hi {
            let mid = lo + (hi - lo + 1) / 2;
            if feasible(mid, &mut extra) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo
    }
}
