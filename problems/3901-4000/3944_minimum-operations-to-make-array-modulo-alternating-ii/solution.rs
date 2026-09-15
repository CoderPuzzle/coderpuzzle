impl Solution {
    pub fn min_operations(a: Vec<i32>, k: i32) -> i64 {
        let k = k as usize;
        fn cost(a: &[i32], k: usize, p: usize) -> Vec<i64> {
            let mut c = vec![0i64; k];
            for i in (p..a.len()).step_by(2) {
                c[a[i] as usize % k] += 1;
            }
            let mut pc = vec![0i64; 3 * k + 1];
            let mut ps = vec![0i64; 3 * k + 1];
            for i in 0..3 * k {
                pc[i + 1] = pc[i] + c[i % k];
                ps[i + 1] = ps[i] + c[i % k] * i as i64;
            }
            let mut o = vec![0; k];
            let h = k / 2;
            for x in 0..k {
                let m = x + k;
                let l = m - h;
                let r = m + k - 1 - h;
                let lc = pc[m + 1] - pc[l];
                let ls = ps[m + 1] - ps[l];
                let rc = pc[r + 1] - pc[m + 1];
                let rs = ps[r + 1] - ps[m + 1];
                o[x] = m as i64 * lc - ls + rs - m as i64 * rc;
            }
            o
        }
        let e = cost(&a, k, 0);
        let o = cost(&a, k, 1);
        let (mut p, mut q) = (0, 1);
        if o[q] < o[p] {
            std::mem::swap(&mut p, &mut q);
        }
        for i in 2..k {
            if o[i] < o[p] {
                q = p;
                p = i;
            } else if o[i] < o[q] {
                q = i;
            }
        }
        (0..k).map(|x| e[x] + o[if p == x { q } else { p }]).min().unwrap()
    }
}
