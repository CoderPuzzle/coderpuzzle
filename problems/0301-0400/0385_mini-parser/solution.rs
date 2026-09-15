impl Solution {
    pub fn deserialize(s: String) -> NestedInteger {
        let bytes = s.as_bytes();
        if bytes[0] != b'[' {
            let mut leaf = NestedInteger::new();
            leaf.set_integer(s.parse().unwrap());
            return leaf;
        }
        let mut stack: Vec<NestedInteger> = vec![NestedInteger::new()];
        let mut root: Option<NestedInteger> = None;
        let mut index = 1usize;
        while index < bytes.len() {
            let ch = bytes[index];
            if ch == b'[' {
                stack.push(NestedInteger::new());
                index += 1;
            } else if ch == b']' {
                let node = stack.pop().unwrap();
                match stack.last_mut() {
                    Some(top) => top.add(node),
                    None => root = Some(node),
                }
                index += 1;
            } else if ch == b',' {
                index += 1;
            } else {
                let start = index;
                while bytes[index] != b',' && bytes[index] != b']' {
                    index += 1;
                }
                let text = &s[start..index];
                let mut leaf = NestedInteger::new();
                leaf.set_integer(text.parse().unwrap());
                stack.last_mut().unwrap().add(leaf);
            }
        }
        root.unwrap()
    }
}
