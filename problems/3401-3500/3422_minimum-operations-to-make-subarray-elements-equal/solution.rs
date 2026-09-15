use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_operations(nums: Vec<i32>, k: i32) -> i64 {
        // Equalizing a window costs sum(|x - t|), minimized at a median t.
        // The window slides over two heap halves around the median; running
        // half-sums make each window's cost O(1). Every element packs to
        // the unique key (v + 2^20) << 17 | index so heap keys never tie,
        // which makes lazy deletion exact: the outgoing element routes to
        // its true half by one comparison against the low top, and stale
        // copies are dropped only when they surface at a heap top.
        let n = nums.len();
        let k = k as usize;
        let mut low = BinaryHeap::<i64>::new(); // max-heap: lower half
        let mut high = BinaryHeap::<Reverse<i64>>::new(); // min-heap: upper half
        let mut delayed = vec![0u8; n];
        let (mut low_size, mut high_size) = (0i64, 0i64);
        let (mut low_sum, mut high_sum) = (0i64, 0i64);
        let mut best = i64::MAX;

        let key = |v: i32, i: usize| -> i64 { ((v as i64 + 1048576) << 17) | i as i64 };
        let val = |key: i64| -> i64 { (key >> 17) - 1048576 };
        let idx = |key: i64| -> usize { (key & 131071) as usize };

        for i in 0..n {
            if i >= k {
                let out_key = key(nums[i - k], i - k);
                delayed[i - k] = 1;
                if out_key <= *low.peek().unwrap() {
                    low_size -= 1;
                    low_sum -= nums[i - k] as i64;
                } else {
                    high_size -= 1;
                    high_sum -= nums[i - k] as i64;
                }
            }
            let cur = key(nums[i], i);
            if (low_size == 0 && high_size == 0) || cur <= *low.peek().unwrap() {
                low.push(cur);
                low_size += 1;
                low_sum += nums[i] as i64;
            } else {
                high.push(Reverse(cur));
                high_size += 1;
                high_sum += nums[i] as i64;
            }
            if low_size > high_size + 1 {
                while delayed[idx(*low.peek().unwrap())] != 0 {
                    delayed[idx(*low.peek().unwrap())] = 0;
                    low.pop();
                }
                let move_ = low.pop().unwrap();
                low_size -= 1;
                low_sum -= val(move_);
                high.push(Reverse(move_));
                high_size += 1;
                high_sum += val(move_);
            } else if low_size < high_size {
                while delayed[idx(high.peek().unwrap().0)] != 0 {
                    delayed[idx(high.peek().unwrap().0)] = 0;
                    high.pop();
                }
                let move_ = high.pop().unwrap().0;
                high_size -= 1;
                high_sum -= val(move_);
                low.push(move_);
                low_size += 1;
                low_sum += val(move_);
            }
            if i >= k - 1 {
                while delayed[idx(*low.peek().unwrap())] != 0 {
                    delayed[idx(*low.peek().unwrap())] = 0;
                    low.pop();
                }
                while delayed[idx(high.peek().unwrap().0)] != 0 {
                    delayed[idx(high.peek().unwrap().0)] = 0;
                    high.pop();
                }
                let median = val(*low.peek().unwrap());
                let cost = median * low_size - low_sum + (high_sum - median * high_size);
                best = best.min(cost);
            }
        }
        best
    }
}
