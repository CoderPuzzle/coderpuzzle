use std::collections::HashMap;

impl Solution {
    pub fn is_possible_to_rearrange(s: String, t: String, k: i32) -> bool {
        // The rearrangement exists exactly when the two chunk multisets
        // match: any order of t's chunks is reachable, and every piece of
        // s must be consumed whole. Hash-counting makes the comparison a
        // single O(n) pass over the two chunk sequences.
        let k = k as usize;
        let size = s.len() / k;
        let bytes = s.as_bytes();
        let target = t.as_bytes();
        let mut counts: HashMap<&[u8], i32> = HashMap::new();
        for i in 0..k {
            let chunk = &bytes[i * size..(i + 1) * size];
            *counts.entry(chunk).or_insert(0) += 1;
        }
        for i in 0..k {
            let chunk = &target[i * size..(i + 1) * size];
            let left = counts.get_mut(chunk);
            match left {
                Some(count) if *count > 0 => *count -= 1,
                _ => return false,
            }
        }
        true
    }
}
