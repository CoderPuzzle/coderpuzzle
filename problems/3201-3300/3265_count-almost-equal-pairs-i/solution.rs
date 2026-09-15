use std::collections::HashSet;

impl Solution {
    pub fn count_pairs(nums: Vec<i32>) -> i32 {
        // The family of a value holds every number reachable by
        // exchanging two of its digits at most once, itself included;
        // swapped strings parse back through parse, so leading zeros
        // collapse (30 -> "03" -> 3). A pair qualifies when either
        // side sits in the other's family; one swap may touch one
        // number only, so both directions are tested.
        let families: Vec<HashSet<i32>> = nums.iter().map(|&value| family(value)).collect();
        let mut pairs = 0;
        for i in 0..nums.len() {
            for j in i + 1..nums.len() {
                if families[i].contains(&nums[j]) || families[j].contains(&nums[i]) {
                    pairs += 1;
                }
            }
        }
        pairs
    }
}

fn family(value: i32) -> HashSet<i32> {
    let digits = value.to_string().into_bytes();
    let mut reached = HashSet::new();
    reached.insert(value);
    for p in 0..digits.len() {
        for q in p + 1..digits.len() {
            let mut swapped = digits.clone();
            swapped.swap(p, q);
            if let Ok(parsed) = String::from_utf8(swapped).unwrap().parse() {
                reached.insert(parsed);
            }
        }
    }
    reached
}
