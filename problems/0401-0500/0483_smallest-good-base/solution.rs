impl Solution {
    pub fn smallest_good_base(n: String) -> String {
        let value: i64 = n.parse().expect("n is a decimal integer");
        // An all-ones representation is a geometric sum 1 + k + ... + k^m.
        // Scan lengths longest-first: at a fixed total, more terms force
        // every term - the base included - to be smaller, so the first
        // length that admits an integer base already carries the smallest
        // one.
        for m in (2..=60).rev() {
            if let Some(base) = Self::base_for_length(value, m) {
                return base.to_string();
            }
        }
        // No representation of three 1s or longer fits; "11" in base
        // value - 1 always does.
        (value - 1).to_string()
    }

    // 1 + k + ... + k^m rises strictly with k, so grow a power-of-two
    // bound past the target, then bisect down to the smallest base whose
    // sum reaches value; that base is the hit when the sum equals value
    // exactly.
    fn base_for_length(value: i64, m: i32) -> Option<i64> {
        let mut hi: i64 = 2;
        while Self::sum_capped(hi, m, value) <= value {
            hi *= 2;
        }
        let mut lo: i64 = 2;
        while lo < hi {
            let mid = (lo + hi) / 2;
            if Self::sum_capped(mid, m, value) < value {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        if Self::sum_capped(lo, m, value) == value {
            Some(lo)
        } else {
            None
        }
    }

    // The geometric sum, capped at "already past value": comparing the
    // term against value / k before multiplying is the overflow guard -
    // no stored number ever exceeds 2 * value <= 2 * 10^18, which fits
    // the 64-bit integers the fixed-width languages carry.
    fn sum_capped(k: i64, m: i32, value: i64) -> i64 {
        let mut total: i64 = 1;
        let mut term: i64 = 1;
        for _ in 0..m {
            if term > value / k {
                return value + 1;
            }
            term *= k;
            total += term;
            if total > value {
                return value + 1;
            }
        }
        total
    }
}
