impl Solution {
    // Per window (hint 2): the segment to sort ends at the last element
    // smaller than the running max before it, and starts at the first
    // element larger than the running min after it. A sorted window sets
    // neither boundary, so its answer is 0.
    pub fn min_subarray_sort(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let n = nums.len();
        let k = k as usize;
        let mut res = vec![0i32; n - k + 1];
        for s in 0..=(n - k) {
            let e = s + k;
            let mut right: Option<usize> = None;
            let mut mx = 0i32;
            for i in s..e {
                if nums[i] < mx {
                    right = Some(i);
                } else {
                    mx = nums[i];
                }
            }
            let right = match right {
                Some(r) => r,
                None => continue,
            };
            let mut left = s;
            let mut mn = i32::MAX;
            for i in (s..e).rev() {
                if nums[i] > mn {
                    left = i;
                } else {
                    mn = nums[i];
                }
            }
            res[s] = (right - left + 1) as i32;
        }
        res
    }
}
