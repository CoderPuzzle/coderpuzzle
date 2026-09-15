impl Solution {
    pub fn subtree_inversion_sum(e: Vec<Vec<i32>>, nums: Vec<i32>, k: i32) -> i64 {
        let (n, k) = (nums.len(), k as usize);
        let w = k + 1;
        let mut g = vec![vec![]; n];
        for x in e {
            let (u, v) = (x[0] as usize, x[1] as usize);
            g[u].push(v);
            g[v].push(u);
        }
        let mut p = vec![usize::MAX; n];
        let mut ord = vec![0];
        let mut z = 0;
        while z < ord.len() {
            let u = ord[z];
            for &v in &g[u] {
                if v != p[u] {
                    p[v] = u;
                    ord.push(v);
                }
            }
            z += 1;
        }
        const I: i64 = 1i64 << 60;
        let mut mx = vec![-I; n * w];
        let mut mn = vec![I; n * w];
        for &u in ord.iter().rev() {
            let mut a = vec![-I; w];
            let mut b = vec![I; w];
            a[k] = nums[u] as i64;
            b[k] = a[k];
            let (mut sm, mut sn) = (-nums[u] as i64, -nums[u] as i64);
            for &v in &g[u] {
                if p[v] != u {
                    continue;
                }
                let o = v * w;
                sm -= mn[o + k - 1].min(mn[o + k]);
                sn -= mx[o + k - 1].max(mx[o + k]);
                let mut x = vec![-I; w];
                let mut y = vec![I; w];
                for d in 0..k {
                    x[d + 1] = mx[o + d];
                    y[d + 1] = mn[o + d];
                }
                x[k] = x[k].max(mx[o + k]);
                y[k] = y[k].min(mn[o + k]);
                let (mut ax, mut ay, mut xx, mut xy) = (a.clone(), b.clone(), x.clone(), y.clone());
                for d in (0..k).rev() {
                    ax[d] = ax[d].max(ax[d + 1]);
                    ay[d] = ay[d].min(ay[d + 1]);
                    xx[d] = xx[d].max(xx[d + 1]);
                    xy[d] = xy[d].min(xy[d + 1]);
                }
                let mut na = vec![-I; w];
                let mut nb = vec![I; w];
                na[k] = a[k] + x[k];
                nb[k] = b[k] + y[k];
                for d in 1..k {
                    let t = d.max(k - d);
                    na[d] = (a[d] + xx[t]).max(x[d] + ax[t]);
                    nb[d] = (b[d] + xy[t]).min(y[d] + ay[t]);
                }
                a = na;
                b = nb;
            }
            a[0] = sm;
            b[0] = sn;
            mx[u * w..(u + 1) * w].copy_from_slice(&a);
            mn[u * w..(u + 1) * w].copy_from_slice(&b);
        }
        *mx[..w].iter().max().unwrap()
    }
}
