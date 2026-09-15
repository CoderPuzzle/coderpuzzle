impl Solution {
    pub fn get_words_in_longest_subsequence(words: Vec<String>, groups: Vec<i32>) -> Vec<String> {
        // dp[i] is the length of the longest valid subsequence ending at
        // index i; prev[i] remembers the predecessor that achieved it.
        // Scanning predecessors from i - 1 downward and updating only on a
        // strict improvement keeps the latest compatible index attaining the
        // maximum, which pins one deterministic answer out of the many the
        // statement permits.
        let n = words.len();
        let mut dp = vec![1usize; n];
        let mut prev = vec![-1isize; n];
        for i in 0..n {
            for j in (0..i).rev() {
                if groups[j] == groups[i] || words[j].len() != words[i].len() {
                    continue;
                }
                if dp[j] + 1 <= dp[i] {
                    continue;
                }
                // Hamming distance exactly 1: walk the equal-length strings
                // and stop at a second mismatch.
                let (a, b) = (words[j].as_bytes(), words[i].as_bytes());
                let mut diffs = 0;
                for p in 0..a.len() {
                    if diffs >= 2 {
                        break;
                    }
                    if a[p] != b[p] {
                        diffs += 1;
                    }
                }
                if diffs == 1 {
                    dp[i] = dp[j] + 1;
                    prev[i] = j as isize;
                }
            }
        }
        let mut best = n - 1;
        for i in (0..n - 1).rev() {
            if dp[i] > dp[best] {
                best = i;
            }
        }
        let mut answer = Vec::new();
        let mut i = best as isize;
        while i != -1 {
            answer.push(words[i as usize].clone());
            i = prev[i as usize];
        }
        answer.reverse();
        answer
    }
}
