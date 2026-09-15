impl Solution {
    pub fn maximum_score(nums: Vec<i32>, k: i32) -> i64 {
        // Each subarray contributes a +max and a -min mark, so at most
        // min(k, n // 2) opposite pairs exist; a pair's credit is its plus
        // mark minus its minus mark -- exactly one subarray's range.
        let size = (k as usize).min(nums.len() / 2) + 1;
        let neg = i64::MIN / 4;
        let fresh = || vec![neg; size];
        // Close a pair: the count grows by one.
        let shift_add = |s: &Vec<i64>, d: i64| -> Vec<i64> {
            let mut out = vec![neg; size];
            for i in 1..size {
                if s[i - 1] > neg {
                    out[i] = s[i - 1] + d;
                }
            }
            out
        };
        let bump =
            |s: Vec<i64>, d: i64| -> Vec<i64> { s.into_iter().map(|v| if v > neg { v + d } else { v }).collect() };
        let merge = |a: Vec<i64>, b: &Vec<i64>| -> Vec<i64> { a.into_iter().zip(b).map(|(x, y)| x.max(*y)).collect() };

        // Phase 0: closed[j] = j pairs done; op/om = one open pair started
        // with a +/- still owing its opposite sign.
        let mut closed = fresh();
        closed[0] = 0;
        let mut op = fresh();
        let mut om = fresh();
        // Phase 1: wp/wm = the seam pair open, started +/-; wXY = seam X and
        // an open middle pair Y; fz = the seam pair has closed.
        let (mut wp, mut wm, mut wpp, mut wpm, mut wmp, mut wmm, mut fz) =
            (fresh(), fresh(), fresh(), fresh(), fresh(), fresh(), fresh());

        for a in nums {
            let a = a as i64;
            let pristine = closed[0];

            let n_op = merge(op.clone(), &bump(closed.clone(), a));
            let n_om = merge(om.clone(), &bump(closed.clone(), -a));
            let n_closed = merge(merge(closed.clone(), &shift_add(&op, -a)), &shift_add(&om, a));

            let mut n_wp = wp.clone();
            let mut n_wm = wm.clone();
            n_wp[0] = n_wp[0].max(pristine + a); // seam opens at the first mark
            n_wm[0] = n_wm[0].max(pristine - a);
            let n_wpp = merge(wpp.clone(), &bump(wp.clone(), a));
            let n_wpm = merge(wpm.clone(), &bump(wp.clone(), -a));
            let n_wmp = merge(wmp.clone(), &bump(wm.clone(), a));
            let n_wmm = merge(wmm.clone(), &bump(wm.clone(), -a));
            let n_wp2 = merge(shift_add(&wpp, -a), &shift_add(&wpm, a));
            n_wp = merge(n_wp, &n_wp2);
            let n_wm2 = merge(shift_add(&wmp, -a), &shift_add(&wmm, a));
            n_wm = merge(n_wm, &n_wm2);
            let n_fz = merge(merge(fz.clone(), &shift_add(&wp, -a)), &shift_add(&wm, a));

            closed = n_closed;
            op = n_op;
            om = n_om;
            wp = n_wp;
            wm = n_wm;
            wpp = n_wpp;
            wpm = n_wpm;
            wmp = n_wmp;
            wmm = n_wmm;
            fz = n_fz;
        }

        (0..size).map(|i| closed[i].max(fz[i])).max().unwrap().max(0)
    }
}
