impl Solution {
    pub fn reach_number(target: i32) -> i32 {
        // Reversing every move maps a path to target onto a path to
        // -target, so only |target| matters. Walking right for k moves
        // lands on the triangular sum T = k(k+1)/2; flipping move i to the
        // left lowers the total by exactly 2i, so an even overshoot
        // T - |target| is repaired without extra moves while an odd one
        // never is. Take the first k whose T reaches |target| with an even
        // overshoot — advancing k one step adds k+1 to T, flipping parity
        // within at most two steps. Near the 1e9 bound the running sum
        // passes a billion, so the accumulation runs in i64.
        let t = (target as i64).abs();
        let (mut k, mut total) = (1i64, 1i64);
        while total < t || (total - t) % 2 != 0 {
            k += 1;
            total += k;
        }
        k as i32
    }
}
