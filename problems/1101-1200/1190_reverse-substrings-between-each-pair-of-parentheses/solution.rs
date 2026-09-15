impl Solution {
    pub fn reverse_parentheses(s: String) -> String {
        // fragment stack mirrors the parenthesis nesting; the base fragment
        // is the outermost level and ends up holding the answer
        let mut stack: Vec<Vec<u8>> = vec![Vec::new()];
        for ch in s.bytes() {
            match ch {
                // open a fresh fragment for the new nesting level
                b'(' => stack.push(Vec::new()),
                b')' => {
                    // matching pair complete: reverse the finished fragment
                    // and fold it into the level below — reversal composes
                    // with nesting
                    let mut top = stack.pop().unwrap();
                    top.reverse();
                    stack.last_mut().unwrap().extend(top);
                }
                // letters accumulate in the innermost current fragment
                _ => stack.last_mut().unwrap().push(ch),
            }
        }
        String::from_utf8(stack.pop().unwrap()).unwrap()
    }
}
