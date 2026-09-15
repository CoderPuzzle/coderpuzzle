impl Solution {
    pub fn max_score(nums: Vec<i32>, x: i32) -> i64 {
        let unseen = -(1_i64 << 60);
        let mut best = [unseen, unseen];
        best[(nums[0] % 2) as usize] = nums[0] as i64;

        for &number in nums.iter().skip(1) {
            let parity = (number % 2) as usize;
            let value = number as i64;
            let extended = best[parity] + value;
            let switched = best[parity ^ 1] + value - x as i64;
            best[parity] = extended.max(switched);
        }
        best[0].max(best[1])
    }
}
