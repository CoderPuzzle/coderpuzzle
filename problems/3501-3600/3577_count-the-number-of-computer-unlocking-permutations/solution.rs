impl Solution {
    pub fn count_permutations(complexity: Vec<i32>) -> i32 {
        // Computer i can only be unlocked through some already-unlocked
        // j < i with lower complexity, so the leftmost minimum of the whole
        // array can never be unlocked unless it is computer 0 itself: no
        // smaller label exists to unlock it through. Hence the answer is
        // (n - 1)! when complexity[0] is the strict minimum, else 0.
        const MOD: i64 = 1_000_000_007;
        if complexity.iter().skip(1).any(|&value| value <= complexity[0]) {
            return 0;
        }
        let mut count: i64 = 1;
        for multiplier in 2..complexity.len() as i64 {
            count = count * multiplier % MOD;
        }
        count as i32
    }
}
