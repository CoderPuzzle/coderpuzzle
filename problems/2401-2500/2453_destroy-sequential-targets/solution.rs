use std::collections::HashMap;

impl Solution {
    pub fn destroy_targets(nums: Vec<i32>, space: i32) -> i32 {
        // Two targets are destroyed by one seed exactly when their values
        // share a residue modulo space (their difference is a multiple of
        // space), so group nums by nums[i] % space. The smallest value of
        // the largest group seeds the machine and wipes the whole group.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        let mut mins: HashMap<i32, i32> = HashMap::new();
        for &value in nums.iter() {
            let r = value % space;
            *counts.entry(r).or_insert(0) += 1;
            mins.entry(r).and_modify(|m| *m = (*m).min(value)).or_insert(value);
        }
        let best = counts.values().copied().max().unwrap();
        counts
            .iter()
            .filter(|&(_, &count)| count == best)
            .map(|(&r, _)| mins[&r])
            .min()
            .unwrap()
    }
}
