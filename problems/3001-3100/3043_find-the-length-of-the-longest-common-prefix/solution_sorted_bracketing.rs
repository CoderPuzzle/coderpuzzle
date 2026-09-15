impl Solution {
    pub fn longest_common_prefix(arr1: Vec<i32>, arr2: Vec<i32>) -> i32 {
        // The deepest cross-array agreement is realized by two lexicographically
        // adjacent entries, so merge both arrays as source-tagged digit strings.
        let mut entries: Vec<(String, u8)> = Vec::with_capacity(arr1.len() + arr2.len());
        for &x in &arr1 {
            entries.push((x.to_string(), 0));
        }
        for &y in &arr2 {
            entries.push((y.to_string(), 1));
        }
        // Sort as digit strings, never numerically: only lexicographic order
        // keeps a prefix family in one contiguous block.
        entries.sort_by(|a, b| a.0.cmp(&b.0));
        let mut best: i32 = 0;
        for i in 1..entries.len() {
            // Same-source neighbors cannot witness a cross pair.
            if entries[i - 1].1 == entries[i].1 {
                continue;
            }
            let (u, v) = (&entries[i - 1].0, &entries[i].0);
            let mut shared: i32 = 0;
            for j in 0..u.len().min(v.len()) {
                if u.as_bytes()[j] != v.as_bytes()[j] {
                    // Digits diverge: the run cannot extend past here.
                    break;
                }
                shared += 1;
            }
            if shared > best {
                best = shared;
            }
        }
        best
    }
}
