use std::collections::HashMap;

pub struct FindSumPairs {
    // nums2 changes but nums1 never does, so keep a frequency map of nums2
    // and scan the short nums1 on every count: for each a in nums1 add
    // freq2[tot - a]. An add updates one slot plus its two frequency
    // entries. The pair count can reach |nums1| * |nums2| = 1e8, hence i64.
    nums1: Vec<i32>,
    nums2: Vec<i32>,
    freq2: HashMap<i32, i64>,
}

impl FindSumPairs {
    pub fn new(nums1: Vec<i32>, nums2: Vec<i32>) -> Self {
        let mut freq2: HashMap<i32, i64> = HashMap::with_capacity(nums2.len() * 2);
        for &v in &nums2 {
            *freq2.entry(v).or_insert(0) += 1;
        }
        FindSumPairs { nums1, nums2, freq2 }
    }

    pub fn add(&mut self, index: i32, val: i32) {
        let index = index as usize;
        let old = self.nums2[index];
        *self.freq2.get_mut(&old).unwrap() -= 1;
        let now = old + val;
        self.nums2[index] = now;
        *self.freq2.entry(now).or_insert(0) += 1;
    }

    pub fn count(&mut self, tot: i32) -> i64 {
        self.nums1
            .iter()
            .map(|&a| self.freq2.get(&(tot - a)).copied().unwrap_or(0))
            .sum()
    }
}
