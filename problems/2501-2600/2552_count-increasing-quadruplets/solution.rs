impl Solution {
    pub fn count_quadruplets(nums: Vec<i32>) -> i64 {
        // For every pair j < k with nums[k] < nums[j], a quadruplet is any
        // i < j with nums[i] < nums[k] plus any l > k with nums[l] > nums[j].
        // Each j rebuilds the less-than row and sweeps its window
        // right-to-left carrying the suffix-greater count. Answers reach
        // C(4000,4) ~ 1.07e13, beyond i32, hence the i64 accumulators.
        let n = nums.len();
        let mut ans: i64 = 0;
        let mut less: Vec<i32> = vec![0; n + 2];
        for j in 1..n - 2 {
            let mut x = nums[j - 1] + 1;
            while x <= n as i32 {
                less[x as usize] += 1;
                x += 1;
            }
            let vj = nums[j];
            let mut tot: i64 = 0;
            let mut c: i64 = 0;
            for k in ((j + 1)..n).rev() {
                let uk = nums[k] as i64;
                if uk < vj as i64 {
                    tot += less[uk as usize] as i64 * c;
                } else if uk > vj as i64 {
                    c += 1;
                }
            }
            ans += tot;
        }
        ans
    }
}
