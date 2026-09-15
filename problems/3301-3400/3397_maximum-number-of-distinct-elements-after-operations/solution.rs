impl Solution {
    // Each element may land anywhere in [v-k, v+k]; assigning the values in
    // sorted order leaves every element the smallest value that is still
    // free and inside its window, which never hurts later ones.
    pub fn max_distinct_elements(mut nums: Vec<i32>, k: i32) -> i32 {
        nums.sort_unstable();
        let mut last = nums[0] as i64 - k as i64 - 1;
        let mut count = 0;
        for &v in &nums {
            let mut target = v as i64 - k as i64;
            if target <= last {
                target = last + 1;
            }
            if target <= v as i64 + k as i64 {
                last = target;
                count += 1;
            }
        }
        count
    }
}
