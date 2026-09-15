use std::collections::BTreeMap;

impl Solution {
    pub fn is_possible_divide(nums: Vec<i32>, k: i32) -> bool {
        // size-k sets can partition the array only if k divides n
        if nums.len() % k as usize != 0 {
            return false;
        }
        let mut counts: BTreeMap<i32, i64> = BTreeMap::new();
        for &x in &nums {
            *counts.entry(x).or_insert(0) += 1;
        }
        // BTreeMap keys come out smallest-first: the smallest remaining
        // value forces its run — every set containing it is exactly v..v+k-1
        let values: Vec<i32> = counts.keys().copied().collect();
        for value in values {
            let need = *counts.get(&value).unwrap();
            // already fully consumed by runs started below
            if need <= 0 {
                continue;
            }
            // each of the need copies of value starts its own run; any of
            // the next k values falling short means no valid division exists
            for i in value..value + k {
                let have = counts.get(&i).copied().unwrap_or(0);
                if have < need {
                    return false;
                }
                counts.insert(i, have - need);
            }
        }
        true
    }
}
