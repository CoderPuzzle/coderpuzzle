impl Solution {
    pub fn can_divide_into_subsequences(nums: Vec<i32>, k: i32) -> bool {
        // The longest run of equal values forces that many separate
        // sequences; the array is sorted, so runs are contiguous.
        let mut maxfreq: i64 = 1;
        let mut run: i64 = 1;
        for i in 1..nums.len() {
            run = if nums[i] == nums[i - 1] { run + 1 } else { 1 };
            if run > maxfreq {
                maxfreq = run;
            }
        }
        // The product can hit 1e10, past i32 range — compare in i64.
        nums.len() as i64 >= maxfreq * k as i64
    }
}
