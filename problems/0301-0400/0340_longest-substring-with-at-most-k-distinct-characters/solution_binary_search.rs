use std::collections::HashMap;

impl Solution {
    pub fn length_of_longest_substring_k_distinct(s: String, k: i32) -> i32 {
        let bytes = s.as_bytes();
        let k = k as usize;
        // Feasibility of a fixed length: does any window of exactly L
        // symbols carry at most k distinct ones? One sweep maintains the
        // multiplicities of the current window, sliding its left edge out
        // one step behind its right edge.
        let feasible = |length: usize| -> bool {
            if length == 0 {
                return true;
            }
            let mut counts: HashMap<u8, usize> = HashMap::new();
            let mut distinct = 0usize;
            for i in 0..bytes.len() {
                let incoming = counts.entry(bytes[i]).or_insert(0);
                *incoming += 1;
                if *incoming == 1 {
                    distinct += 1;
                }
                if i >= length {
                    let outgoing = counts.get_mut(&bytes[i - length]).unwrap();
                    *outgoing -= 1;
                    if *outgoing == 0 {
                        distinct -= 1;
                    }
                }
                if i >= length - 1 && distinct <= k {
                    return true;
                }
            }
            false
        };
        // A substring of a valid window is valid too, so feasibility is
        // monotone in the length — binary search for the longest feasible.
        let mut lo = 0usize;
        let mut hi = bytes.len();
        while lo < hi {
            let mid = lo + (hi - lo + 1) / 2;
            if feasible(mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo as i32
    }
}
