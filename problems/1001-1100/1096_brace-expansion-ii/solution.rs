use std::collections::HashSet;

impl Solution {
    pub fn brace_expansion_i_i(expression: String) -> Vec<String> {
        // Iterative stack machine. cur holds the words of the concatenation
        // so far; a '{' pushes it as a saved prefix and starts a group
        // whose comma-separated alternatives accumulate in a union slot
        // (None marks "no alternatives yet"); a '}' closes the group and
        // concatenates its union onto the saved prefix.
        let mut stack: Vec<Option<HashSet<String>>> = Vec::new();
        let mut cur: HashSet<String> = HashSet::new();
        cur.insert(String::new());
        for c in expression.chars() {
            if c == '{' {
                stack.push(Some(cur.clone()));
                stack.push(None); // group union slot
                cur = HashSet::new();
                cur.insert(String::new());
            } else if c == ',' {
                let slot = stack.last_mut().unwrap();
                match slot {
                    None => {
                        *slot = Some(cur.clone());
                    }
                    Some(set) => {
                        for w in &cur {
                            set.insert(w.clone());
                        }
                    }
                }
                cur = HashSet::new();
                cur.insert(String::new());
            } else if c == '}' {
                let slot = stack.pop().unwrap();
                let group = match slot {
                    None => cur,
                    Some(mut set) => {
                        set.extend(cur);
                        set
                    }
                };
                let prev = stack.pop().unwrap().unwrap();
                let mut next = HashSet::new();
                for a in &prev {
                    for b in &group {
                        next.insert(format!("{a}{b}"));
                    }
                }
                cur = next;
            } else {
                let mut next = HashSet::new();
                for w in &cur {
                    next.insert(format!("{w}{c}"));
                }
                cur = next;
            }
        }
        let mut result: Vec<String> = cur.into_iter().collect();
        result.sort();
        result
    }
}
