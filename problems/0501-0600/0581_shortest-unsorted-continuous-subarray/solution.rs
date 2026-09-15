impl Solution {
    pub fn find_unsorted_subarray(nums: Vec<i32>) -> i32 {
        // Scan left to right carrying the running max: an element below the
        // running max is out of place, and the LAST such index is the
        // window's right edge; a right-to-left pass with the running min
        // finds the left edge. Strict < and > keep equal values out.
        let n = nums.len() as i32;
        let mut start = -1;
        let mut end = -1;
        let mut running_max = i32::MIN;
        for i in 0..n {
            if nums[i as usize] < running_max {
                end = i;
            } else {
                running_max = nums[i as usize];
            }
        }
        let mut running_min = i32::MAX;
        for i in (0..n).rev() {
            if nums[i as usize] > running_min {
                start = i;
            } else {
                running_min = nums[i as usize];
            }
        }
        if end == -1 {
            0
        } else {
            end - start + 1
        }
    }
}
