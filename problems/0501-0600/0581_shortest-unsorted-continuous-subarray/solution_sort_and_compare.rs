impl Solution {
    pub fn find_unsorted_subarray(nums: Vec<i32>) -> i32 {
        // Sort a copy and compare position by position: everything outside
        // the reorder window already sits where the sorted order puts it,
        // so the FIRST and LAST disagreeing positions are the window's edges.
        let n = nums.len();
        let mut sorted = nums.clone();
        sorted.sort();
        let mut start = 0usize;
        while start < n && nums[start] == sorted[start] {
            start += 1;
        }
        if start == n {
            return 0;
        }
        let mut end = n - 1;
        while nums[end] == sorted[end] {
            end -= 1;
        }
        (end - start + 1) as i32
    }
}
