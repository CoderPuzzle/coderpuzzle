impl Solution {
    pub fn earliest_second_to_mark_indices(nums: Vec<i32>, changeIndices: Vec<i32>) -> i32 {
        let n = nums.len();
        let can_mark = |t: usize| -> bool {
            let mut last = vec![0_usize; n];
            for s in 1..=t {
                last[(changeIndices[s - 1] - 1) as usize] = s;
            }
            let mut need: i64 = 0;
            let mut marked = 0_usize;
            for s in 1..=t {
                let i = (changeIndices[s - 1] - 1) as usize;
                if last[i] == s {
                    need += nums[i] as i64;
                    marked += 1;
                    if need > (s - marked) as i64 {
                        return false;
                    }
                }
            }
            marked == n
        };
        let mut lo = 1_usize;
        let mut hi = changeIndices.len();
        while lo < hi {
            let mid = (lo + hi) / 2;
            if can_mark(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        if can_mark(lo) {
            lo as i32
        } else {
            -1
        }
    }
}
