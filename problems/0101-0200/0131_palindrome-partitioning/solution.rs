impl Solution {
    pub fn partition(s: String) -> Vec<Vec<String>> {
        let s = s.as_bytes();
        let n = s.len();
        // Table of palindrome verdicts for every interval s[i..j]; reversing
        // i ensures the inner interval is computed before any outer interval
        // that reads it.
        let mut is_pal = vec![vec![false; n]; n];
        for i in (0..n).rev() {
            for j in i..n {
                // Palindrome iff ends match and the interior is empty or pal.
                if s[i] == s[j] && (j - i < 2 || is_pal[i + 1][j - 1]) {
                    is_pal[i][j] = true;
                }
            }
        }

        let mut result: Vec<Vec<String>> = Vec::new();
        let mut current: Vec<String> = Vec::new();
        backtrack(s, 0, &is_pal, &mut current, &mut result);
        result
    }
}

fn backtrack(s: &[u8], start: usize, is_pal: &[Vec<bool>], current: &mut Vec<String>, result: &mut Vec<Vec<String>>) {
    if start == s.len() {
        // The pieces tile the whole string: snapshot the partition.
        result.push(current.clone());
        return;
    }
    // Increasing `end` yields shorter first pieces before longer ones,
    // producing the required output order.
    for end in start..s.len() {
        if is_pal[start][end] {
            current.push(String::from_utf8(s[start..end + 1].to_vec()).unwrap());
            backtrack(s, end + 1, is_pal, current, result);
            current.pop();
        }
    }
}
