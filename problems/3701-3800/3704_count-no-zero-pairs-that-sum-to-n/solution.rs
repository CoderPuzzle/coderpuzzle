impl Solution {
    pub fn count_no_zero_pairs(n: i64) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut ds: Vec<i64> = Vec::new();
        let mut x = n;
        if x == 0 {
            ds.push(0);
        }
        while x > 0 {
            ds.push(x % 10);
            x /= 10;
        }
        ds.push(0);
        let length = ds.len();

        // g[carry][a_active][b_active]
        let mut g = [[[0i64; 2]; 2]; 2];
        g[0][0][0] = 1;
        let mut pos = length;
        while pos > 0 {
            pos -= 1;
            let mut ng = [[[0i64; 2]; 2]; 2];
            for carry in 0..2usize {
                for aa in 0..2usize {
                    for ba in 0..2usize {
                        let mut res: i64 = 0;
                        for da in 0..10i64 {
                            if aa == 0 && da != 0 {
                                break;
                            }
                            for db in 0..10i64 {
                                if ba == 0 && db != 0 {
                                    break;
                                }
                                if pos == 0 && (da == 0 || db == 0) {
                                    continue;
                                }
                                let s = da + db + carry as i64;
                                if s % 10 != ds[pos] {
                                    continue;
                                }
                                let nc = (s / 10) as usize;
                                let naa = if aa == 1 && da != 0 { 1 } else { 0 };
                                let nba = if ba == 1 && db != 0 { 1 } else { 0 };
                                res += g[nc][naa][nba];
                            }
                        }
                        ng[carry][aa][ba] = res % MOD;
                    }
                }
            }
            g = ng;
        }
        g[0][1][1] as i32
    }
}
