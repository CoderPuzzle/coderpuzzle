impl Solution {
    pub fn find_lus_length(strs: Vec<String>) -> i32 {
        // A string can only win as itself: if any other string contains it as
        // a subsequence, every subsequence it could offer is common to both,
        // and equal duplicates contain each other, so both are disqualified.
        let mut best: i32 = -1;
        for i in 0..strs.len() {
            let s = strs[i].as_bytes();
            let mut contained = false;
            for j in 0..strs.len() {
                if i == j {
                    continue;
                }
                // Two-pointer scan: walk strs[j] once, advancing in s
                // whenever the next character matches; s is a subsequence of
                // strs[j] iff all of s was consumed.
                let mut at = 0;
                for &c in strs[j].as_bytes() {
                    if at < s.len() && s[at] == c {
                        at += 1;
                    }
                }
                if at == s.len() {
                    contained = true;
                    break;
                }
            }
            if !contained && s.len() as i32 > best {
                best = s.len() as i32;
            }
        }
        best
    }
}
