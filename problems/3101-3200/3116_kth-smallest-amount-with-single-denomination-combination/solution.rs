impl Solution {
    fn gcd_euclid(mut a: i64, mut b: i64) -> i64 {
        while b != 0 {
            let t = a % b;
            a = b;
            b = t;
        }
        a
    }

    pub fn find_kth_smallest(coins: Vec<i32>, k: i32) -> i64 {
        let m = coins.len();

        let min_coin = *coins.iter().min().unwrap();
        let count_le = |x: i64| -> i64 {
            let mut total: i64 = 0;
            // inclusion-exclusion: each subset S contributes floor(x / lcm(S))
            for mask in 1..(1i64 << m) {
                let mut l: i64 = 1;
                let mut bits = 0;
                let mut overflow = false;
                for j in 0..m {
                    if mask >> j & 1 == 1 {
                        let g = Self::gcd_euclid(l, coins[j] as i64);
                        l = l / g * coins[j] as i64;
                        bits += 1;
                        // an lcm past x would only contribute 0; stop early
                        if l > x {
                            overflow = true;
                            break;
                        }
                    }
                }
                if overflow {
                    continue;
                }
                // odd subsets add, even subtract, so duplicates count once
                if bits % 2 == 1 {
                    total += x / l;
                } else {
                    total -= x / l;
                }
            }
            total
        };

        let k = k as i64;
        // count(x) is monotone; the answer is the least x with count(x) >= k
        // (the k-th multiple of the smallest coin is a safe upper bound)
        let mut lo: i64 = 1;
        let mut hi: i64 = k * min_coin as i64;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if count_le(mid) >= k {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}
