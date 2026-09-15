impl Solution {
    pub fn nth_magical_number(n: i32, a: i32, b: i32) -> i32 {
        // Divisible by a or b, so inclusion-exclusion counts the magical
        // numbers up to x as x/a + x/b - x/lcm(a, b) — the overlap holds
        // exactly the multiples of the least common multiple. That count
        // never decreases and rises by one exactly on magical numbers, so
        // the nth magical number is the smallest x whose count reaches n.
        // Binary search over [1, n*min(a, b)] finds it — the top is the
        // nth multiple of the smaller value, itself magical, so it is a
        // valid ceiling. At the bound n = 1e9 with a = b = 4e4 the answer
        // reaches 4e13, so the search runs in i64; only the value reduced
        // below 1e9 + 7 is narrowed.
        let (mut g, mut y) = (a as i64, b as i64);
        while y != 0 {
            let t = g % y;
            g = y;
            y = t;
        }
        let lcm = a as i64 / g * b as i64;
        let (mut lo, mut hi) = (1i64, n as i64 * a.min(b) as i64);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if mid / a as i64 + mid / b as i64 - mid / lcm >= n as i64 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        (lo % 1_000_000_007) as i32
    }
}
