impl Solution {
    pub fn max_difference(s: String, k: i32) -> i32 {
        let s = s.as_bytes();
        let n = s.len();
        let k = k as i64;
        let mut best: i64 = -(1i64 << 62);
        for a in 0u8..5 {
            for b in 0u8..5 {
                if a == b {
                    continue;
                }
                let mut diff = vec![0i64; n + 1];
                let mut pa = vec![0i64; n + 1];
                let mut pb = vec![0i64; n + 1];
                let mut last_b_at = vec![-1i64; n + 1];
                let mut last_b: i64 = -1;
                for i in 0..n {
                    let d = s[i] - b'0';
                    diff[i + 1] = diff[i];
                    pa[i + 1] = pa[i];
                    pb[i + 1] = pb[i];
                    if d == a {
                        diff[i + 1] += 1;
                        pa[i + 1] ^= 1;
                    } else if d == b {
                        diff[i + 1] -= 1;
                        pb[i + 1] ^= 1;
                        last_b = i as i64;
                    }
                    last_b_at[i + 1] = last_b;
                }
                let inf = 1i64 << 62;
                let mut min_val = [[inf; 2]; 2];
                let mut prev_bound: i64 = -1;
                for r in 1..=(n as i64) {
                    let lb = last_b_at[r as usize];
                    let bound = if lb == -1 { -1 } else { (r - k).min(lb) };
                    if bound >= 0 {
                        let mut l = prev_bound + 1;
                        while l <= bound {
                            let v = diff[l as usize];
                            let x = pa[l as usize] as usize;
                            let y = pb[l as usize] as usize;
                            if v < min_val[x][y] {
                                min_val[x][y] = v;
                            }
                            l += 1;
                        }
                        prev_bound = bound;
                        let mv = min_val[(pa[r as usize] ^ 1) as usize][pb[r as usize] as usize];
                        if mv != inf {
                            let cand = diff[r as usize] - mv;
                            if cand > best {
                                best = cand;
                            }
                        }
                    }
                }
            }
        }
        best as i32
    }
}
