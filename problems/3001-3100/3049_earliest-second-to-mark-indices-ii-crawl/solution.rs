use std::cmp::Reverse;
use std::collections::BinaryHeap;
use std::collections::HashMap;

impl Solution {
    pub fn earliest_second_to_mark_indices(nums: Vec<i32>, change_indices: Vec<i32>) -> i32 {
        // Binary search the horizon: finishing within t seconds also
        // finishes within t + 1.
        let mut lo = 1usize;
        let mut hi = change_indices.len();
        if !Self::can_finish(&nums, &change_indices, hi) {
            return -1;
        }
        while lo < hi {
            let mid = (lo + hi) / 2;
            if Self::can_finish(&nums, &change_indices, mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }

    fn can_finish(nums: &[i32], change_indices: &[i32], t: usize) -> bool {
        let n = nums.len();
        // Fewer seconds than indices can never mark them all.
        if t < n {
            return false;
        }
        // First occurrence of every index within [1, t]: clearing at the
        // earliest chance dominates any later pin, since an earlier
        // set-second only relaxes where the mark may land.
        let mut first: HashMap<i32, usize> = HashMap::new();
        for s in 0..t {
            first.entry(change_indices[s]).or_insert(s + 1);
        }
        let mut deadlines: Vec<usize> = first.values().copied().collect();
        deadlines.sort_unstable_by(|a, b| b.cmp(a));
        // Sweep pinned seconds latest to earliest, banking each clearance's
        // saving of nums[v] - 1 (one set-op replaces the whole decrement
        // chain). Every suffix of chosen clearances needs distinct marks
        // after its deadline outside its own pins, capping the suffix at
        // half the window 2 * chosen <= t - f + 1; on a breach give back
        // the banked clearance with the smallest saving. Reverse turns
        // BinaryHeap into a min-heap.
        let mut bank: BinaryHeap<Reverse<i64>> = BinaryHeap::new();
        let mut saved: i64 = 0;
        let mut chosen: i64 = 0;
        for &f in &deadlines {
            let c = nums[change_indices[f - 1] as usize - 1] as i64;
            if c < 2 {
                continue;
            }
            bank.push(Reverse(c));
            saved += c - 1;
            chosen += 1;
            while 2 * chosen > (t - f + 1) as i64 {
                saved -= bank.pop().unwrap().0 - 1;
                chosen -= 1;
            }
        }
        // Uncleared indices keep their decrement chains; the surviving work
        // plus one mark per index must fit into [1, t]. Values reach
        // n * 10^9, so all accounting stays in i64.
        let total: i64 = n as i64 + nums.iter().map(|&x| x as i64).sum::<i64>();
        total - saved <= t as i64
    }
}
