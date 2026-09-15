impl Solution {
    pub fn find_the_string(lcp: Vec<Vec<i32>>) -> String {
        let n = lcp.len();
        // A real matrix is symmetric; reject fakes up front so only the
        // lower triangle needs checking later.
        for i in 0..n {
            for j in i + 1..n {
                if lcp[i][j] != lcp[j][i] {
                    return String::new();
                }
            }
        }
        // Positive entries weld indices into letter-equality classes:
        // word[i] == word[j] iff lcp[i][j] > 0. Flood-fill those classes.
        let mut group = vec![-1i32; n];
        let mut groups = 0i32;
        let mut stack: Vec<usize> = Vec::new();
        for i in 0..n {
            if group[i] >= 0 {
                continue;
            }
            group[i] = groups;
            stack.push(i);
            while let Some(u) = stack.pop() {
                for v in 0..n {
                    if lcp[u][v] > 0 && group[v] < 0 {
                        group[v] = groups;
                        stack.push(v);
                    }
                }
            }
            groups += 1;
        }
        if groups > 26 {
            return String::new();
        }
        // Cross-class order is unconstrained, so the alphabetically
        // smallest candidate numbers the classes by first appearance.
        let mut letters = vec![b'-'; groups as usize];
        let mut nxt = b'a';
        let mut word = vec![b' '; n];
        let mut code = vec![0i32; n];
        for i in 0..n {
            let g = group[i] as usize;
            if letters[g] == b'-' {
                letters[g] = nxt;
                nxt += 1;
            }
            word[i] = letters[g];
            code[i] = word[i] as i32;
        }
        // Rebuild dp[i][j] = lcp(word[i:], word[j:]) bottom-up and require
        // an exact match on every stored entry; a fabricated matrix fails
        // here even when its positivity structure looked consistent.
        let mut below = vec![0i32; n + 1]; // row i+1; trailing slot stays 0
        for i in (0..n).rev() {
            let ci = code[i];
            let mut cur = vec![0i32; n + 1];
            let target = &lcp[i];
            for j in (0..=i).rev() {
                if code[j] == ci {
                    cur[j] = below[j + 1] + 1;
                }
                if cur[j] != target[j] {
                    return String::new();
                }
            }
            below = cur;
        }
        String::from_utf8(word).unwrap()
    }
}
