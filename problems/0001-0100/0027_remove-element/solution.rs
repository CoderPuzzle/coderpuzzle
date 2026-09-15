impl Solution {
    // Write pointer: nums[:k] always holds the survivors seen so far, so one
    // read pass compacts them to the front in place — no shifting.
    pub fn remove_element(nums: Vec<i32>, val: i32) -> Vec<i32> {
        let mut nums = nums;
        let mut k = 0;
        for index in 0..nums.len() {
            if nums[index] != val {
                nums[k] = nums[index];
                k += 1;
            }
        }
        // The statement frees both the order and the tail beyond k, so the
        // compacted prefix is the whole judged answer; its length is k.
        nums.truncate(k);
        nums
    }
}
