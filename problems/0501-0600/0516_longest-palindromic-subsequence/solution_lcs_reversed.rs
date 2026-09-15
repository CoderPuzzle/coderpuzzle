impl Solution {
    pub fn longest_palindrome_subseq(s: String) -> i32 {
        let s = s.as_bytes();
        let n = s.len();
        if n == 0 {
            return 0;
        }
        // A mirror reads the same both ways, so it survives reversing
        // the string: the answer is the longest common subsequence of
        // s and its reversal. Each row of that table reads only the
        // row above, so two rows carry the whole computation.
        let mut t: Vec<u8> = s.to_vec();
        t.reverse();
        let mut prev = vec![0i32; n + 1];
        for i in 1..=n {
            let mut curr = vec![0i32; n + 1];
            for j in 1..=n {
                if s[i - 1] == t[j - 1] {
                    // Agreeing first letters open a common
                    // subsequence built from the two remainders.
                    curr[j] = prev[j - 1] + 1;
                } else {
                    // At least one of the two first letters is
                    // absent from an optimal common subsequence.
                    curr[j] = prev[j].max(curr[j - 1]);
                }
            }
            prev = curr;
        }
        prev[n]
    }
}
