impl Solution {
    pub fn is_perfect_square(num: i32) -> bool {
        // Squares march upward in lockstep — 1, 4, 9, 16, … — the map
        // r -> r * r is strictly increasing over the positives, so "is num a
        // perfect square" asks whether one sorted row contains num, and a
        // sorted row is exactly what binary search interrogates. Keep the root
        // candidates in lo..hi (starting 1..num — a root never exceeds its own
        // number), square each midpoint, and move lo above a probe that fell
        // short or hi below one that overshot. An empty interval means no root;
        // only an exact hit ever returned true. The bounds live in i64 — num
        // reaches 2³¹ - 1 and the first midpoint squares to ~1.15 × 10¹⁸,
        // past 32 bits — so mid * mid cannot overflow.
        let num = num as i64;
        let mut lo = 1;
        let mut hi = num;
        while lo <= hi {
            let mid = (lo + hi) / 2;
            let square = mid * mid;
            if square == num {
                return true;
            }
            if square < num {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        false
    }
}
