impl Solution {
    pub fn max_score(a: Vec<i32>, max_val: i32) -> i32 {
        let n = max_val.max(*a.iter().max().unwrap()) as usize;
        let mut f = vec![0i32; n + 1];
        let mut d = vec![0i32; n + 1];
        let mut sp: Vec<usize> = (0..=n).collect();
        for x in a {
            f[x as usize] += 1;
        }
        for z in 1..=n {
            for x in (z..=n).step_by(z) {
                d[z] += f[x];
            }
        }
        for p in 2..=n {
            if p * p > n {
                break;
            }
            if sp[p] == p {
                for x in (p * p..=n).step_by(p) {
                    if sp[x] == x {
                        sp[x] = p;
                    }
                }
            }
        }
        let mut ans = i32::MIN;
        for x in 1..=n {
            if f[x] == 0 && x > max_val as usize {
                continue;
            }
            let mut ps = vec![];
            let mut v = x;
            while v > 1 {
                let p = sp[v];
                ps.push(p);
                while v % p == 0 {
                    v /= p;
                }
            }
            let mut bad = 0;
            for mask in 1usize..1usize << ps.len() {
                let (mut q, mut bits) = (1, 0);
                for (i, &p) in ps.iter().enumerate() {
                    if mask >> i & 1 != 0 {
                        q *= p;
                        bits += 1;
                    }
                }
                bad += if bits % 2 == 1 { d[q] } else { -d[q] };
            }
            let cost = if f[x] > 0 {
                bad - if x > 1 { 1 } else { 0 }
            } else {
                bad.max(1)
            };
            ans = ans.max(x as i32 - cost);
        }
        ans
    }
}
