impl Solution {
    pub fn beautiful_indices(s: String, a: String, b: String, k: i32) -> Vec<i32> {
        fn occurrences(pattern: &str, text: &str) -> Vec<i32> {
            let pattern = pattern.as_bytes();
            let text = text.as_bytes();
            let m = pattern.len();
            // KMP failure function: pi[i] is the length of the longest proper
            // prefix of pattern[..=i] that is also its suffix.
            let mut pi = vec![0usize; m];
            let mut matched = 0usize;
            for i in 1..m {
                while matched > 0 && pattern[i] != pattern[matched] {
                    matched = pi[matched - 1];
                }
                if pattern[i] == pattern[matched] {
                    matched += 1;
                }
                pi[i] = matched;
            }
            // One scan of text; on a full match the failure function keeps
            // the scan going instead of restarting, so periodic texts stay
            // linear.
            let mut starts: Vec<i32> = Vec::new();
            matched = 0;
            for (i, &byte) in text.iter().enumerate() {
                while matched > 0 && byte != pattern[matched] {
                    matched = pi[matched - 1];
                }
                if byte == pattern[matched] {
                    matched += 1;
                }
                if matched == m {
                    starts.push((i + 1 - m) as i32);
                    matched = pi[matched - 1];
                }
            }
            starts
        }
        let in_a = occurrences(&a, &s);
        let in_b = occurrences(&b, &s);
        let mut result: Vec<i32> = Vec::new();
        // Both lists ascend and i - k grows along in_a, so the first
        // b-occurrence at or after i - k only moves forward: one merge-style
        // pass tests each window [i - k, i + k] in amortized constant time.
        let mut low = 0usize;
        for &i in &in_a {
            while low < in_b.len() && in_b[low] < i - k {
                low += 1;
            }
            if low < in_b.len() && in_b[low] <= i + k {
                result.push(i);
            }
        }
        result
    }
}
