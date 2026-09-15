impl Solution {
    // Per supplier: sorted boxes assign each package its smallest fitting
    // size; waste = count*(box) - range package sum via prefix sums.
    // Skip suppliers whose largest box is too small.
    pub fn min_wasted_space(packages: Vec<i32>, boxes: Vec<Vec<i32>>) -> i64 {
        let mut pkg: Vec<i64> = packages.iter().map(|&v| v as i64).collect();
        pkg.sort_unstable();
        let n = pkg.len();
        let mut pre = vec![0i64; n + 1];
        for i in 0..n {
            pre[i + 1] = pre[i] + pkg[i];
        }
        let mut best: i64 = -1;
        for supplier in &boxes {
            let mut s: Vec<i64> = supplier.iter().map(|&v| v as i64).collect();
            s.sort_unstable();
            if *s.last().unwrap() < pkg[n - 1] {
                continue;
            }
            let mut waste = 0i64;
            let mut prev = 0usize;
            for &b in &s {
                let cnt = pkg.partition_point(|&p| p <= b);
                if cnt > prev {
                    waste += (cnt - prev) as i64 * b - (pre[cnt] - pre[prev]);
                    prev = cnt;
                }
                if prev == n {
                    break;
                }
            }
            if best < 0 || waste < best {
                best = waste;
            }
        }
        if best < 0 {
            -1
        } else {
            best % 1_000_000_007
        }
    }
}
