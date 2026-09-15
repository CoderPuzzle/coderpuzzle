use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

impl Solution {
    pub fn mode_weight(nums: Vec<i32>, k: i32) -> i64 {
        // cnt holds each value's frequency inside the window; bucket[f]
        // counts how many distinct values sit at frequency f, so the top
        // frequency tracks entries and exits in O(1). Heap entries are
        // (-frequency, value) pairs under Reverse, so the heap top is the
        // smallest value of the top frequency; stale entries (their
        // recorded frequency has since moved) are skimmed off when they
        // reach the top — every revisit of a state pushes a fresh copy, so
        // discarding them early is safe. Weights reach 10^10 and the total
        // 2.5 * 10^14, so the sum widens to i64.
        let mut cnt: HashMap<i32, i32> = HashMap::new();
        let mut bucket: HashMap<i32, i32> = HashMap::new();
        let mut heap: BinaryHeap<Reverse<(i32, i32)>> = BinaryHeap::new();
        let (mut top_freq, mut total) = (0i32, 0i64);
        for right in 0..nums.len() {
            // Enter: lift the arriving value one frequency up.
            let entering = {
                let count = cnt.entry(nums[right]).or_insert(0);
                *count += 1;
                *count
            };
            *bucket.entry(entering).or_insert(0) += 1;
            if entering > 1 {
                *bucket.entry(entering - 1).or_insert(0) -= 1;
            }
            if entering > top_freq {
                top_freq = entering;
            }
            heap.push(Reverse((-entering, nums[right])));
            if right >= k as usize {
                // Leave: drop the exiting value one frequency down; only a
                // one-step fall of the top frequency is ever possible.
                let leaving = nums[right - k as usize];
                let exiting = {
                    let count = cnt.get_mut(&leaving).unwrap();
                    *count -= 1;
                    *count
                };
                *bucket.entry(exiting + 1).or_insert(0) -= 1;
                if exiting > 0 {
                    *bucket.entry(exiting).or_insert(0) += 1;
                    heap.push(Reverse((-exiting, leaving)));
                }
                if bucket.get(&top_freq).copied().unwrap_or(0) == 0 {
                    top_freq -= 1;
                }
            }
            if right + 1 >= k as usize {
                // Skim stale tops, then score mode * top frequency.
                loop {
                    let Reverse((frequency, value)) = *heap.peek().unwrap();
                    if cnt[&value] == -frequency {
                        break;
                    }
                    heap.pop();
                }
                let Reverse((_, mode)) = *heap.peek().unwrap();
                total += mode as i64 * top_freq as i64;
            }
        }
        total
    }
}
