use std::collections::VecDeque;

impl Solution {
    pub fn shortest_subarray(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        // Negatives break the sliding-window trick, so reason in
        // prefix sums: a subarray sum is prefix[i] - prefix[j], and
        // the sentinel prefix[0] = 0 lets subarrays starting at 0
        // compete.
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }
        let k = k as i64;
        // Deque of start indices whose prefix sums strictly increase
        // front to back.
        let mut dq: VecDeque<usize> = VecDeque::new();
        let mut best = n as i32 + 1;
        for i in 0..=n {
            let p = prefix[i];
            // Consume qualifying fronts: each offers length i - front,
            // and popping is safe because later ends only lengthen the
            // same start.
            while let Some(&f) = dq.front() {
                if prefix[f] <= p - k {
                    best = best.min(i as i32 - f as i32);
                    dq.pop_front();
                } else {
                    break;
                }
            }
            // A later index with an equal-or-smaller prefix dominates
            // as a future start, so trim the tail.
            while let Some(&b) = dq.back() {
                if prefix[b] >= p {
                    dq.pop_back();
                } else {
                    break;
                }
            }
            dq.push_back(i);
        }
        if best <= n as i32 {
            best
        } else {
            -1
        }
    }
}
