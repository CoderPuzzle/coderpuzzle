impl Solution {
    pub fn beautiful_indices(s: String, a: String, b: String, k: i32) -> Vec<i32> {
        // An index is beautiful exactly when it is an occurrence of a whose
        // window [i - k, i + k] contains an occurrence of b. Collect both
        // occurrence lists once — each scan advances one character at a time
        // so overlapping occurrences are not skipped — then for each
        // a-occurrence binary-search the sorted b-list for the leftmost
        // entry >= i - k; it qualifies iff that entry also satisfies
        // <= i + k. Ascending a-occurrences keep the answer ascending.
        let bytes = s.as_bytes();
        let occurrences = |pattern: &str| {
            let pat = pattern.as_bytes();
            let mut found = Vec::new();
            for start in 0..=bytes.len().saturating_sub(pat.len()) {
                if &bytes[start..start + pat.len()] == pat {
                    found.push(start as i32);
                }
            }
            found
        };
        let where_b = occurrences(b.as_str());
        let mut answer = Vec::new();
        for i in occurrences(a.as_str()) {
            let mut low = 0usize;
            let mut high = where_b.len();
            while low < high {
                let mid = (low + high) / 2;
                if where_b[mid] < i - k {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            if low < where_b.len() && where_b[low] <= i + k {
                answer.push(i);
            }
        }
        answer
    }
}
