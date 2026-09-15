impl Solution {
    pub fn min_adjacent_swaps(nums: Vec<i32>, a: i32, b: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut counts = [0i64; 3];
        let mut answer = 0i64;
        for value in nums {
            let group = if value < a {
                0
            } else if value <= b {
                1
            } else {
                2
            };
            if group == 0 {
                answer += counts[1] + counts[2];
            } else if group == 1 {
                answer += counts[2];
            }
            counts[group] += 1;
        }
        (answer % MOD) as i32
    }
}
