impl Solution {
    pub fn maximum_sale_items(a: Vec<Vec<i32>>, budget: i32) -> i32 {
        let b = budget as usize;
        let m = a.iter().map(|x| x[0]).max().unwrap() as usize;
        let mut f = vec![0; m + 1];
        let mut d = vec![0; m + 1];
        for x in &a {
            f[x[0] as usize] += 1;
        }
        for z in 1..=m {
            for x in (z..=m).step_by(z) {
                d[z] += f[x];
            }
        }
        const N: i32 = -1_000_000_000;
        let mut dp = vec![N; b + 1];
        dp[0] = 0;
        for x in a {
            let p = x[1] as usize;
            let g = d[x[0] as usize];
            let old = dp;
            let mut nw = old.clone();
            for r in 0..p.min(b + 1) {
                let (mut best, mut q) = (N, 0);
                for c in (r..=b).step_by(p) {
                    if q > 0 && old[c - p] > N {
                        best = best.max(old[c - p] - q + 1);
                    }
                    if best > N {
                        nw[c] = nw[c].max(q + g - 1 + best);
                    }
                    q += 1;
                }
            }
            dp = nw;
        }
        *dp.iter().max().unwrap()
    }
}
