use std::collections::HashMap;

impl Solution {
    pub fn minimum_total_cost(nums1: Vec<i32>, nums2: Vec<i32>) -> i64 {
        // Pay every equal column tentatively and histogram their values;
        // buy the cheapest neutral columns while one value dominates the
        // chosen set. The total reaches n*(n-1)/2 ~ 5e9, hence i64.
        let mut cost: i64 = 0;
        let mut cnt: HashMap<i32, i32> = HashMap::new();
        let mut chosen: i32 = 0;
        let mut dom = -1; // values are >= 1, so -1 can never be a real key
        for i in 0..nums1.len() {
            if nums1[i] == nums2[i] {
                let slot = cnt.entry(nums1[i]).or_insert(0);
                *slot += 1;
                let c = *slot;
                if c > cnt.get(&dom).copied().unwrap_or(0) {
                    dom = nums1[i];
                }
                chosen += 1;
                cost += i as i64;
            }
        }
        if chosen == 0 {
            return 0;
        }
        let mut j = 0usize;
        while j < nums1.len() && cnt[&dom] * 2 > chosen {
            if nums1[j] != nums2[j] && nums1[j] != dom && nums2[j] != dom {
                chosen += 1;
                cost += j as i64;
            }
            j += 1;
        }
        if cnt[&dom] * 2 <= chosen {
            cost
        } else {
            -1
        }
    }
}
