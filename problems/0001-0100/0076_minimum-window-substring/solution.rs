use std::collections::HashMap;

impl Solution {
    pub fn min_window(s: String, t: String) -> String {
        let s = s.as_bytes();
        let t = t.as_bytes();
        if t.is_empty() || t.len() > s.len() {
            return String::new();
        }
        // need[c] = copies of c the window still owes; missing = total owed
        // instances, so missing == 0 is an O(1) coverage test.
        let mut need: HashMap<u8, i32> = HashMap::new();
        for &ch in t {
            *need.entry(ch).or_insert(0) += 1;
        }
        let mut missing = t.len() as i32;
        let mut best_start = 0usize;
        let mut best_len: Option<usize> = None;
        let mut left = 0usize;
        for right in 0..s.len() {
            let ch = s[right];
            // need > 0 means this occurrence is genuinely required; the
            // unconditional decrement then drives surplus copies negative
            // without ever touching missing again.
            if need.get(&ch).copied().unwrap_or(0) > 0 {
                missing -= 1;
            }
            *need.entry(ch).or_insert(0) -= 1;
            if missing == 0 {
                // Valid window: shed surplus leftmost characters, returning
                // each released copy to the budget, until one sits at quota.
                while left < right && need[&s[left]] < 0 {
                    *need.get_mut(&s[left]).unwrap() += 1;
                    left += 1;
                }
                let len = right - left + 1;
                if best_len.is_none() || len < best_len.unwrap() {
                    best_start = left;
                    best_len = Some(len);
                }
                // Evict the leftmost required character on purpose so the
                // search owes exactly one instance and scanning can resume.
                *need.get_mut(&s[left]).unwrap() += 1;
                missing += 1;
                left += 1;
            }
        }
        match best_len {
            Some(len) => String::from_utf8(s[best_start..best_start + len].to_vec()).unwrap(),
            None => String::new(),
        }
    }
}
