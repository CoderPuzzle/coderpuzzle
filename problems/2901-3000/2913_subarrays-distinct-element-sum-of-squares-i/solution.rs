impl Solution {
    pub fn sum_counts(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut ans: i64 = 0;
        // For each left end, grow the right end one element at a time; the
        // running distinct count only ever grows, so it is the distinct
        // count of every prefix subarray nums[i..j].
        for i in 0..n {
            let mut seen = [false; 101];
            let mut distinct = 0usize;
            for j in i..n {
                let v = nums[j] as usize;
                if !seen[v] {
                    seen[v] = true;
                    distinct += 1;
                }
                ans += (distinct * distinct) as i64;
            }
        }
        ans as i32
    }
}
