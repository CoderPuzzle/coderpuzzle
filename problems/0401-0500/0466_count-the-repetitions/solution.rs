use std::collections::HashMap;

impl Solution {
    // Walk str1 one s1-block at a time. The only state crossing a block
    // boundary is the cursor into s2 plus the copies consumed so far, and
    // the cursor alone decides how any later block plays out — so a
    // repeated cursor exposes a cycle that can be jumped arithmetically.
    pub fn get_max_repetitions(s1: String, n1: i32, s2: String, n2: i32) -> i32 {
        let (s1, s2) = (s1.as_bytes(), s2.as_bytes());
        let mut seen: HashMap<usize, (i64, i64)> = HashMap::new();
        let mut cursor = 0;
        let mut copies: i64 = 0;
        let mut blocks: i64 = 0;
        while blocks < n1 as i64 {
            for &ch in s1 {
                if ch == s2[cursor] {
                    cursor += 1;
                    if cursor == s2.len() {
                        cursor = 0;
                        copies += 1;
                    }
                }
            }
            blocks += 1;
            if let Some(&(start_blocks, start_copies)) = seen.get(&cursor) {
                // Every cycle of blocks adds a fixed number of copies; take
                // as many whole cycles as fit, then walk the leftovers.
                let jumps = (n1 as i64 - blocks) / (blocks - start_blocks);
                copies += jumps * (copies - start_copies);
                blocks += jumps * (blocks - start_blocks);
                seen.clear();
            } else {
                seen.insert(cursor, (blocks, copies));
            }
        }
        (copies / n2 as i64) as i32
    }
}
