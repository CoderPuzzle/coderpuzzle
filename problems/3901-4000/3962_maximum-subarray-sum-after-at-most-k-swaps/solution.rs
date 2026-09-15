struct SwapBit {
    n: usize,
    c: Vec<i32>,
    s: Vec<i64>,
}
impl SwapBit {
    fn new(n: usize) -> Self {
        Self {
            n,
            c: vec![0; n + 1],
            s: vec![0; n + 1],
        }
    }
    fn add(&mut self, mut p: usize, x: i32, y: i64) {
        p += 1;
        while p <= self.n {
            self.c[p] += x;
            self.s[p] += y;
            p += p & (!p + 1)
        }
    }
    fn pref(&self, mut p: usize) -> (i32, i64) {
        let (mut x, mut y) = (0, 0);
        while p > 0 {
            x += self.c[p];
            y += self.s[p];
            p &= p - 1
        }
        (x, y)
    }
    fn kth(&self, mut k: i32) -> usize {
        let (mut p, mut z) = (0, 1);
        while z << 1 <= self.n {
            z <<= 1
        }
        while z > 0 {
            if p + z <= self.n && self.c[p + z] < k {
                k -= self.c[p + z];
                p += z
            }
            z >>= 1
        }
        p
    }
    fn small(&self, k: i32, v: &[i32]) -> i64 {
        if k == 0 {
            return 0;
        }
        let p = self.kth(k);
        let (c, s) = self.pref(p);
        s + (k - c) as i64 * v[p] as i64
    }
}
impl Solution {
    pub fn max_sum(a: Vec<i32>, k: i32) -> i64 {
        let n = a.len();
        let mut v = a.clone();
        v.sort_unstable();
        v.dedup();
        let p: Vec<_> = a.iter().map(|x| v.binary_search(x).unwrap()).collect();
        let mut best = i64::MIN;
        for l in 0..n {
            let (mut inside, mut outside) = (SwapBit::new(v.len()), SwapBit::new(v.len()));
            for i in 0..n {
                outside.add(p[i], 1, a[i] as i64)
            }
            let mut sum = 0;
            for r in l..n {
                outside.add(p[r], -1, -(a[r] as i64));
                inside.add(p[r], 1, a[r] as i64);
                sum += a[r] as i64;
                let oc = n - (r - l + 1);
                let (mut lo, mut hi) = (0, k.min((r - l + 1) as i32).min(oc as i32));
                while lo < hi {
                    let t = (lo + hi + 1) / 2;
                    if v[outside.kth(oc as i32 - t + 1)] > v[inside.kth(t)] {
                        lo = t
                    } else {
                        hi = t - 1
                    }
                }
                let gain = outside.small(oc as i32, &v) - outside.small(oc as i32 - lo, &v) - inside.small(lo, &v);
                best = best.max(sum + gain)
            }
        }
        best
    }
}
