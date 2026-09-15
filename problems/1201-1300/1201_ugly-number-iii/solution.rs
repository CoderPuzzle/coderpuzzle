impl Solution {
    pub fn nth_ugly_number(n: i32, a: i32, b: i32, c: i32) -> i64 {
        let (a, b, c) = (a as i64, b as i64, c as i64);
        let ab = Self::lcm(a, b);
        let ac = Self::lcm(a, c);
        let bc = Self::lcm(b, c);
        let abc = Self::lcm(ab, c);
        // count(x) is non-decreasing, so binary search the smallest x with
        // count(x) >= n — that x is itself ugly; hi is the answer ceiling
        let (mut lo, mut hi) = (1i64, 2_000_000_000i64);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if Self::count(mid, a, b, c, ab, ac, bc, abc) >= n as i64 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }

    fn count(x: i64, a: i64, b: i64, c: i64, ab: i64, ac: i64, bc: i64, abc: i64) -> i64 {
        // ugly numbers <= x via inclusion-exclusion: add each divisor's
        // multiples, subtract the pairwise lcms (counted twice), add
        // back the triple lcm
        x / a + x / b + x / c - x / ab - x / ac - x / bc + x / abc
    }

    fn gcd(mut x: i64, mut y: i64) -> i64 {
        while y != 0 {
            let t = x % y;
            x = y;
            y = t;
        }
        x
    }

    fn lcm(x: i64, y: i64) -> i64 {
        x / Self::gcd(x, y) * y
    }
}
