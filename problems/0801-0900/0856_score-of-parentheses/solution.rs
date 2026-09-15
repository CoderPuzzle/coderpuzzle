impl Solution {
    pub fn score_of_parentheses(s: String) -> i32 {
        // The rules only add siblings and double wrapped wholes, so every
        // score is a sum over "()" cores, each worth 2^d where d is the
        // number of pairs open around it. One sweep keeps the open-paren
        // depth; a ')' whose predecessor is '(' has just closed a core, and
        // the post-decrement depth counts its wrappers — add 1 << depth.
        let bytes = s.as_bytes();
        let (mut score, mut depth) = (0i32, 0i32);
        for i in 0..bytes.len() {
            if bytes[i] == b'(' {
                depth += 1;
            } else {
                depth -= 1;
                if bytes[i - 1] == b'(' {
                    score += 1 << depth;
                }
            }
        }
        score
    }
}
