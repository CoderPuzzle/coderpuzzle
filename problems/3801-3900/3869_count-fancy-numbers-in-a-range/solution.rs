use std::collections::HashSet;

impl Solution {
    pub fn count_fancy(l: i64, r: i64) -> i64 {
        // Strictly increasing numbers draw digits from 1..9; strictly
        // decreasing ones from 0..9 with no leading zero. Enumerate every
        // nonempty digit subset once per direction and deduplicate.
        let mut set: HashSet<i64> = HashSet::new();
        for mask in 1..(1 << 9) {
            let mut num: i64 = 0;
            for d in 1..10 {
                if mask & (1 << (d - 1)) != 0 {
                    num = num * 10 + d;
                }
            }
            set.insert(num);
        }
        for mask in 1..(1 << 10) {
            let mut num: i64 = 0;
            for d in (0..10).rev() {
                if mask & (1 << d) != 0 {
                    num = num * 10 + d;
                }
            }
            if num > 0 {
                set.insert(num);
            }
        }
        let mut goods: Vec<i64> = set.iter().copied().collect();
        goods.sort();

        // good[s] == 1 when the integer s is itself strictly monotone;
        // those are exactly the good digit sums (s in [1, 144]).
        let mut good = vec![0i32; 145];
        for &g in &goods {
            if g <= 144 {
                good[g as usize] = 1;
            }
        }

        // overlap[i]: among goods[0..i), how many also have a good digit sum
        let mut overlap = vec![0i64; goods.len() + 1];
        for i in 0..goods.len() {
            overlap[i + 1] = overlap[i] + good[Self::digit_sum(goods[i])] as i64;
        }

        Self::count_up_to(r, &goods, &good, &overlap) - Self::count_up_to(l - 1, &goods, &good, &overlap)
    }

    fn count_up_to(x: i64, goods: &[i64], good: &[i32], overlap: &[i64]) -> i64 {
        // Fancy = good digits OR good digit sum; subtract the goods whose
        // digit sum is also good (counted by both terms).
        Self::count_sum_good(x, good) + Self::count_good(x, goods) - Self::count_overlap(x, goods, overlap)
    }

    fn digit_sum(mut n: i64) -> usize {
        let mut s = 0;
        while n > 0 {
            s += (n % 10) as usize;
            n /= 10;
        }
        s
    }

    fn count_good(x: i64, goods: &[i64]) -> i64 {
        let mut lo = 0usize;
        let mut hi = goods.len();
        while lo < hi {
            let mid = (lo + hi) / 2;
            if goods[mid] <= x {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        lo as i64
    }

    fn count_overlap(x: i64, goods: &[i64], overlap: &[i64]) -> i64 {
        overlap[Self::count_good(x, goods) as usize]
    }

    fn count_sum_good(x: i64, good: &[i32]) -> i64 {
        // Numbers in [1, x] whose digit sum is a good sum.
        if x <= 0 {
            return 0;
        }
        let bytes = x.to_string();
        let bytes = bytes.as_bytes();
        let n = bytes.len();
        // ways[k][t]: k free digits (0-9, leading zeros allowed) summing to
        // exactly t. Counts reach ~10^15, past 32 bits, so the table is i64.
        let mut ways = vec![vec![0i64; 145]; n + 1];
        ways[0][0] = 1;
        for k in 1..=n {
            for t in 0..=144 {
                let mut total = 0i64;
                for d in 0..10 {
                    if t >= d {
                        total += ways[k - 1][t - d];
                    }
                }
                ways[k][t] = total;
            }
        }
        let mut result = 0i64;
        let mut running = 0usize;
        for i in 0..n {
            let v = (bytes[i] - b'0') as usize;
            let k = n - i - 1;
            // A smaller digit here fixes the prefix; the tail is free.
            for d in 0..v {
                let base = running + d;
                let limit = (9 * k).min(144 - base);
                for rem in 0..=limit {
                    if good[base + rem] == 1 {
                        result += ways[k][rem];
                    }
                }
            }
            running += v;
        }
        if good[running] == 1 {
            result += 1;
        }
        result
    }
}
