use std::collections::HashMap;

impl Solution {
    pub fn count_prefix_suffix_pairs(words: Vec<String>) -> i64 {
        // Trie over paired characters (first+last, second+second-last, ...).
        // Node counters stay below 10^5, but the total can reach ~5 * 10^9,
        // so the accumulator is an i64.
        let mut edges: HashMap<u32, usize> = HashMap::new();
        let mut counts: Vec<i32> = vec![0];
        let mut total: i64 = 0;
        for word in &words {
            let bytes = word.as_bytes();
            let size = bytes.len();
            let mut node: usize = 0;
            for j in 0..size {
                let key = (node as u32) * 676 + u32::from(bytes[j] - b'a') * 26 + u32::from(bytes[size - 1 - j] - b'a');
                let next = match edges.get(&key) {
                    Some(&next) => next,
                    None => {
                        let next = counts.len();
                        edges.insert(key, next);
                        counts.push(0);
                        next
                    }
                };
                node = next;
                total += i64::from(counts[node]);
            }
            counts[node] += 1;
        }
        total
    }
}
