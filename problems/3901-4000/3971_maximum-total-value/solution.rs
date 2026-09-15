impl Solution {
    pub fn max_total_value(value: Vec<i32>, decay: Vec<i32>, m: i32) -> i32 {
        const M: i64 = 1_000_000_007;
        let mm = m as i64;
        let count = |g: i64| {
            let mut z = 0;
            for i in 0..value.len() {
                if value[i] as i64 >= g {
                    z += (value[i] as i64 - g) / decay[i] as i64 + 1;
                    if z > mm {
                        return mm + 1;
                    }
                }
            }
            z
        };
        let total = |g: i64| {
            let mut z = 0;
            for i in 0..value.len() {
                if value[i] as i64 >= g {
                    let c = (value[i] as i64 - g) / decay[i] as i64 + 1;
                    z = (z + c % M * value[i] as i64 % M
                        - decay[i] as i64 % M * (c % M) % M * ((c - 1) % M) % M * 500_000_004)
                        % M
                }
            }
            (z + M) % M
        };
        if count(1) <= mm {
            return total(1) as i32;
        }
        let (mut l, mut r) = (1, *value.iter().max().unwrap() as i64);
        while l < r {
            let x = (l + r + 1) / 2;
            if count(x) >= mm {
                l = x
            } else {
                r = x - 1
            }
        }
        let c = count(l + 1);
        ((total(l + 1) + (mm - c) % M * (l % M)) % M) as i32
    }
}
