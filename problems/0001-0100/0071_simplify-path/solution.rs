impl Solution {
    pub fn simplify_path(path: String) -> String {
        // Splitting on "/" turns repeated and edge slashes into empty segments
        // and hands each directory to the loop as one candidate, so only the
        // dot rules remain to apply.
        let mut stack: Vec<&str> = Vec::new();
        for segment in path.split('/') {
            match segment {
                ".." => {
                    // One level up: drop the last name pushed. An empty stack
                    // is the root, where going up is not possible, and popping
                    // an empty Vec is a harmless no-op.
                    stack.pop();
                }
                // "." is the current directory, "" a repeated or edge slash.
                "." | "" => {}
                // Every other segment, "..." and "...." included, is a name.
                _ => stack.push(segment),
            }
        }
        // A leading slash plus exactly one slash between the survivors; an
        // empty stack joins to the bare leading slash of the root.
        format!("/{}", stack.join("/"))
    }
}
