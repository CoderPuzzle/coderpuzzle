use std::collections::HashMap;

impl Solution {
    // Fix the middle index m and count (left pair, right pair) combos where
    // x = nums[m] is the unique mode. With a+b >= 2 side copies of x its
    // frequency 1+a+b is untouchable; with exactly one side copy the 3
    // non-x picks must be pairwise distinct. Per-middle terms stay below
    // ~4 * 10^12, so they are accumulated in an i64 and reduced modulo
    // 10^9 + 7 each middle.
    pub fn subsequences_with_middle_mode(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        fn c2(t: i64) -> i64 {
            t * (t - 1) / 2
        }
        let n = nums.len();
        let mut ids: HashMap<i32, usize> = HashMap::new();
        let mut comp: Vec<usize> = Vec::with_capacity(n);
        for &v in &nums {
            let id = match ids.get(&v) {
                Some(&id) => id,
                None => {
                    let id = ids.len();
                    ids.insert(v, id);
                    id
                }
            };
            comp.push(id);
        }
        let d = ids.len();
        let mut cnt_l = vec![0i64; d];
        let mut cnt_r = vec![0i64; d];
        let (mut sl, mut sr) = (0i64, 0i64);
        for &c in comp.iter().skip(1) {
            sr += cnt_r[c];
            cnt_r[c] += 1;
        }
        let mut ans: i64 = 0;
        for m in 0..n {
            let x = comp[m];
            if m > 0 {
                // advance: nums[m-1] joins the left, nums[m] leaves the right
                let y = comp[m - 1];
                sl += cnt_l[y];
                cnt_l[y] += 1;
                sr -= cnt_r[x] - 1;
                cnt_r[x] -= 1;
            }
            let (l, r) = (cnt_l[x], cnt_r[x]);
            let (ml, mr) = (m as i64 - l, n as i64 - 1 - m as i64 - r);
            let (cl, cr) = (c2(l), c2(r));
            // pair sums over non-x values only: x contributes cl / cr itself
            let (sxl, sxr) = (sl - cl, sr - cr);
            // exactly one side copy of x: the right pair avoids the left
            // pick's value (T_R), or mirrored (T_L)
            let mut tr = 0i64;
            for u in 0..d {
                let lu = cnt_l[u];
                if lu > 0 && u != x {
                    let c_r = cnt_r[u];
                    tr += lu * (c2(mr - c_r) - sxr + c2(c_r));
                }
            }
            let mut tl = 0i64;
            for u in 0..d {
                let ru = cnt_r[u];
                if ru > 0 && u != x {
                    let c_l = cnt_l[u];
                    tl += ru * (c2(ml - c_l) - sxl + c2(c_l));
                }
            }
            let total =
                cl * c2(mr) + cl * r * mr + cl * cr + l * ml * r * mr + l * ml * cr + c2(ml) * cr + l * tr + r * tl;
            ans = (ans + total) % MOD;
        }
        ans as i32
    }
}
