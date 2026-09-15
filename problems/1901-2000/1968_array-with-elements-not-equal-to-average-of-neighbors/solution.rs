impl Solution {
    pub fn rearrange_array(nums: Vec<i32>) -> Vec<i32> {
        // Sort, then interleave halves: the larger half occupies the even
        // indices, the smaller half the odd ones. Each even-indexed value
        // is then strictly above both (lower-half) neighbors and each
        // odd-indexed value strictly below both (upper-half) neighbors,
        // so no interior element can equal the average of its neighbors.
        let mut nums = nums;
        nums.sort_unstable();
        let n = nums.len();
        let mut ans = vec![0; n];
        for k in 0..n - n / 2 {
            ans[2 * k] = nums[n / 2 + k];
        }
        for k in 0..n / 2 {
            ans[2 * k + 1] = nums[k];
        }
        ans
    }
}
