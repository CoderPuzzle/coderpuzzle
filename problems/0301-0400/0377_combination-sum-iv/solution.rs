impl Solution {
    pub fn combination_sum_4(nums: Vec<i32>, target: i32) -> i32 {
        // Order matters, so the table is indexed by the total alone: each
        // sequence reaching t is identified by its last element, making
        // ways[t] the sum of ways[t - x] over every final pick x <= t.
        // i64 accumulation keeps the running counts safe before the answer
        // lands back inside the promised 32-bit range.
        let target = target as usize;
        let mut ways = vec![0i64; target + 1];
        ways[0] = 1; // the empty sequence: exactly one way to build 0
        for t in 1..=target {
            for &x in &nums {
                let x = x as usize;
                if x <= t {
                    ways[t] += ways[t - x];
                }
            }
        }
        ways[target] as i32
    }
}
