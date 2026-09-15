impl Solution {
    pub fn expand(s: String) -> Vec<String> {
        // Parse into option groups: a bare letter is a one-element group,
        // and "{a,b,c}" becomes ["a","b","c"]. Backtrack over the choices,
        // then sort the finished words.
        let bytes = s.as_bytes();
        let mut tokens: Vec<Vec<String>> = Vec::new();
        let mut i = 0usize;
        while i < bytes.len() {
            if bytes[i] == b'{' {
                let j = s[i..].find('}').unwrap() + i;
                tokens.push(s[i + 1..j].split(',').map(|t| t.to_string()).collect());
                i = j + 1;
            } else {
                tokens.push(vec![s[i..i + 1].to_string()]);
                i += 1;
            }
        }
        let mut result = Vec::new();
        let mut cur = String::new();
        Self::dfs(&tokens, 0, &mut cur, &mut result);
        result.sort();
        result
    }

    fn dfs(tokens: &[Vec<String>], idx: usize, cur: &mut String, result: &mut Vec<String>) {
        if idx == tokens.len() {
            result.push(cur.clone());
            return;
        }
        for opt in &tokens[idx] {
            cur.push_str(opt);
            Self::dfs(tokens, idx + 1, cur, result);
            cur.truncate(cur.len() - opt.len());
        }
    }
}
