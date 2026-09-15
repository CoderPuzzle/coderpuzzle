impl Solution {
    pub fn longest_subarray(nums: Vec<i32>, limit: i32) -> i32 {
        let n = nums.len();
        let mut maxq: Vec<usize> = Vec::with_capacity(n);
        let mut minq: Vec<usize> = Vec::with_capacity(n);
        let (mut mh, mut sh) = (0usize, 0usize);
        let mut left = 0usize;
        let mut best = 0i32;
        for right in 0..n {
            let x = nums[right];
            while maxq.len() > mh && nums[*maxq.last().unwrap()] <= x {
                maxq.pop();
            }
            maxq.push(right);
            while minq.len() > sh && nums[*minq.last().unwrap()] >= x {
                minq.pop();
            }
            minq.push(right);
            while nums[maxq[mh]] - nums[minq[sh]] > limit {
                if maxq[mh] == left {
                    mh += 1;
                }
                if minq[sh] == left {
                    sh += 1;
                }
                left += 1;
            }
            let len = (right - left + 1) as i32;
            if len > best {
                best = len;
            }
        }
        best
    }
}
