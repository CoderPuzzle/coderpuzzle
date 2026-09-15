impl Solution {
    // Repeated full passes through source: each pass greedily consumes as
    // much of the remaining target as a subsequence match allows. A pass
    // that matches nothing means the next target character never occurs in
    // source at all, so the task is impossible.
    pub fn shortest_way(source: String, target: String) -> i32 {
        let src = source.as_bytes();
        let tgt = target.as_bytes();
        let (n, m) = (src.len(), tgt.len());
        let mut j = 0usize;
        let mut count = 0i32;
        while j < m {
            let start = j;
            for i in 0..n {
                if j < m && src[i] == tgt[j] {
                    j += 1;
                }
            }
            if j == start {
                return -1;
            }
            count += 1;
        }
        count
    }
}
