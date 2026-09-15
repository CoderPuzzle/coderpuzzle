use std::collections::HashMap;

impl Solution {
    pub fn minimum_operations_to_make_k_periodic(word: String, k: i32) -> i32 {
        // An operation copies one existing k-block over another, so the
        // set of block contents only shrinks and every block must end up
        // equal to some original block. Keeping the most frequent one
        // untouched, each of the other blocks is fixed by a single copy.
        let bytes = word.as_bytes();
        let n = bytes.len();
        let k = k as usize;
        let mut counts: HashMap<&[u8], i32> = HashMap::new();
        let blocks = (n / k) as i32;
        let mut best = 0;
        let mut i = 0;
        while i < n {
            let block = &bytes[i..i + k];
            let next = counts.entry(block).or_insert(0);
            *next += 1;
            if *next > best {
                best = *next;
            }
            i += k;
        }
        blocks - best
    }
}
