use std::collections::HashMap;

impl Solution {
    pub fn find_x_sum(nums: Vec<i32>, k: i32, x: i32) -> Vec<i32> {
        // n <= 50, so each window is recounted directly: one count map per
        // window, then the distinct values sorted by count descending with
        // the value itself breaking ties. Taking the first x of that order
        // keeps every distinct value when fewer than x exist, which is
        // exactly the "x-sum is the array sum" rule.
        let k = k as usize;
        let x = x as usize;
        let mut answer = Vec::with_capacity(nums.len() - k + 1);
        for start in 0..=nums.len() - k {
            let mut counts: HashMap<i32, i32> = HashMap::new();
            for i in start..start + k {
                *counts.entry(nums[i]).or_insert(0) += 1;
            }
            let mut top: Vec<i32> = counts.keys().copied().collect();
            top.sort_by(|&a, &b| counts[&b].cmp(&counts[&a]).then(b.cmp(&a)));
            // Sums stay within k * 50 = 2500, so i32 carries everything.
            let total: i32 = top.iter().take(x).map(|&v| v * counts[&v]).sum();
            answer.push(total);
        }
        answer
    }
}
