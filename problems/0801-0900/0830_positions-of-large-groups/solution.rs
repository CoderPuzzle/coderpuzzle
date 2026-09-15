impl Solution {
    pub fn large_group_positions(s: String) -> Vec<Vec<i32>> {
        // Groups are the maximal runs of one character. One scan keeps
        // start, the index where the current run began; whenever s[i]
        // differs from s[i-1] — or i reaches n, a virtual change that
        // closes the final run — the run [start, i-1] is complete, its
        // length i - start is tested against 3, and the interval is
        // appended. Runs close left to right, so the intervals come out
        // already sorted by start.
        let s = s.as_bytes();
        let n = s.len();
        let mut groups: Vec<Vec<i32>> = Vec::new();
        let mut start = 0usize;
        for i in 1..=n {
            if i == n || s[i] != s[i - 1] {
                if i - start >= 3 {
                    groups.push(vec![start as i32, (i - 1) as i32]);
                }
                start = i;
            }
        }
        groups
    }
}
