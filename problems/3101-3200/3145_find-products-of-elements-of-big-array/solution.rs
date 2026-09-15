impl Solution {
    pub fn find_products_of_elements(queries: Vec<Vec<i64>>) -> Vec<i32> {
        let mut result = Vec::with_capacity(queries.len());
        for q in &queries {
            let exp = Self::exponent_sum(q[1] + 1) - Self::exponent_sum(q[0]);
            result.push(Self::powmod(2, exp, q[2]) as i32);
        }
        result
    }

    // count of integers in [1, M] with bit b set
    fn count_bit(m: i64, b: u32) -> i64 {
        if m <= 0 {
            return 0;
        }
        let cycle = 1i64 << (b + 1);
        let half = 1i64 << b;
        let full = (m + 1) / cycle;
        let rem = (m + 1) % cycle;
        let extra = rem - half;
        full * half + extra.max(0)
    }

    fn popcount_prefix(m: i64) -> i64 {
        let mut total: i64 = 0;
        let mut b: u32 = 0;
        while (1i64 << b) <= m {
            total += Self::count_bit(m, b);
            b += 1;
        }
        total
    }

    fn bitsum_prefix(m: i64) -> i64 {
        let mut total: i64 = 0;
        let mut b: u32 = 0;
        while (1i64 << b) <= m {
            total += b as i64 * Self::count_bit(m, b);
            b += 1;
        }
        total
    }

    // sum of exponents of the first n elements of big_nums (n >= 0)
    fn exponent_sum(n: i64) -> i64 {
        if n <= 0 {
            return 0;
        }
        let mut lo: i64 = 0;
        let mut hi: i64 = n;
        while lo < hi {
            let mid = (lo + hi + 1) / 2;
            if Self::popcount_prefix(mid) <= n {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        let m = lo;
        let mut total = Self::bitsum_prefix(m);
        let mut rem = n - Self::popcount_prefix(m);
        if rem > 0 {
            let x = m + 1;
            let mut b: u32 = 0;
            while rem > 0 {
                if (x >> b) & 1 == 1 {
                    total += b as i64;
                    rem -= 1;
                }
                b += 1;
            }
        }
        total
    }

    fn powmod(mut base: i64, mut exp: i64, m: i64) -> i64 {
        base %= m;
        let mut acc = 1 % m;
        while exp > 0 {
            if exp & 1 == 1 {
                acc = acc * base % m;
            }
            base = base * base % m;
            exp >>= 1;
        }
        acc
    }
}
