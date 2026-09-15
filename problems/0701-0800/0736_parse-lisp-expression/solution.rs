impl Solution {
    pub fn evaluate(expression: String) -> i32 {
        let mut spaced = String::with_capacity(expression.len() + 8);
        for c in expression.chars() {
            match c {
                '(' => spaced.push_str(" ( "),
                ')' => spaced.push_str(" ) "),
                _ => spaced.push(c),
            }
        }
        let tokens: Vec<String> = spaced.split_whitespace().map(|s| s.to_string()).collect();
        let mut idx = 0usize;
        let empty: std::collections::HashMap<String, i32> = std::collections::HashMap::new();
        Self::parse(&tokens, &mut idx, &empty)
    }

    fn is_var(t: &str) -> bool {
        let c = t.as_bytes()[0];
        c >= b'a' && c <= b'z'
    }

    // A token at position i starts the final expression of a let iff it is
    // "(...", a literal, or a variable immediately followed by ")".
    fn expr_start(tokens: &[String], i: usize) -> bool {
        let t = &tokens[i];
        if t == "(" || !Self::is_var(t) {
            return true;
        }
        tokens[i + 1] == ")"
    }

    fn parse(tokens: &[String], i: &mut usize, env: &std::collections::HashMap<String, i32>) -> i32 {
        let token = tokens[*i].clone();
        if token != "(" {
            *i += 1;
            if Self::is_var(&token) {
                return *env.get(&token).unwrap();
            }
            return token.parse::<i32>().unwrap();
        }
        let op = tokens[*i + 1].clone();
        *i += 2;
        if op == "add" || op == "mult" {
            let a = Self::parse(tokens, i, env);
            let b = Self::parse(tokens, i, env);
            *i += 1; // consume ')'
            return if op == "add" { a + b } else { a * b };
        }
        // let
        let mut local = env.clone();
        let mut value = 0;
        while tokens[*i] != ")" {
            if Self::expr_start(tokens, *i) {
                value = Self::parse(tokens, i, &local);
            } else {
                let var = tokens[*i].clone();
                *i += 1;
                value = Self::parse(tokens, i, &local);
                local.insert(var, value);
            }
        }
        *i += 1; // consume ')'
        value
    }
}
