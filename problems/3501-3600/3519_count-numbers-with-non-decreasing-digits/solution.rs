impl Solution {
    pub fn count_numbers(l: String, r: String, b: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let b = b as usize;

        let strip = |s: &str| -> String {
            let t = s.trim_start_matches('0');
            if t.is_empty() {
                "0".to_string()
            } else {
                t.to_string()
            }
        };

        let dec_str = |s: &str| -> Option<String> {
            if s.bytes().all(|c| c == b'0') {
                return None;
            }
            let mut c: Vec<u8> = s.bytes().collect();
            let mut i = c.len();
            while i > 0 {
                i -= 1;
                if c[i] > b'0' {
                    c[i] -= 1;
                    break;
                }
                c[i] = b'9';
            }
            Some(strip(&String::from_utf8(c).unwrap()))
        };

        let to_base = |s0: &str| -> Vec<usize> {
            let mut s = strip(s0);
            let mut digits: Vec<usize> = Vec::new();
            while s != "0" {
                let mut carry = 0usize;
                let mut ns = String::new();
                for ch in s.bytes() {
                    let v = carry * 10 + (ch - b'0') as usize;
                    ns.push((b'0' + (v / b) as u8) as char);
                    carry = v % b;
                }
                digits.push(carry);
                s = strip(&ns);
            }
            if digits.is_empty() {
                return vec![0];
            }
            digits.reverse();
            digits
        };

        let count_up_to = |s: &str| -> i64 {
            let digits = to_base(s);
            let m = digits.len();
            // g[pos][last][tight][started]
            let mut g = vec![vec![vec![[0i64; 2]; 2]; b]; m + 1];
            for last in 0..b {
                for tight in 0..2 {
                    for started in 0..2 {
                        g[m][last][tight][started] = 1;
                    }
                }
            }
            let mut pos = m;
            while pos > 0 {
                pos -= 1;
                for last in 0..b {
                    for tight in 0..2 {
                        for started in 0..2 {
                            let limit = if tight == 1 { digits[pos] } else { b - 1 };
                            let mut res: i64 = 0;
                            for d in 0..=limit {
                                let nt = if tight == 1 && d == limit { 1 } else { 0 };
                                if started == 0 {
                                    if d == 0 {
                                        res += g[pos + 1][0][nt][0];
                                    } else {
                                        res += g[pos + 1][d][nt][1];
                                    }
                                } else if d >= last {
                                    res += g[pos + 1][d][nt][1];
                                }
                            }
                            g[pos][last][tight][started] = res % MOD;
                        }
                    }
                }
            }
            g[0][0][1][0]
        };

        let below = match dec_str(&l) {
            Some(d) => count_up_to(&d),
            None => 0,
        };
        let ans = ((count_up_to(&r) - below) % MOD + MOD) % MOD;
        ans as i32
    }
}
