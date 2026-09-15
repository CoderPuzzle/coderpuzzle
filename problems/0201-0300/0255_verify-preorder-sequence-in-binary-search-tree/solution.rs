impl Solution {
    pub fn verify_preorder(preorder: Vec<i32>) -> bool {
        // The stack holds the values still open for a left descendant — the
        // current left spine, strictly decreasing. low is the closest ancestor
        // already closed by a larger value; everything after that close
        // descends to its right, so every later value must clear it.
        let mut stack: Vec<i32> = Vec::new();
        let mut low = i32::MIN;
        for &value in &preorder {
            // A value below low would have to sit in a closed ancestor's left
            // subtree, which is already finished.
            if value < low {
                return false;
            }
            // A larger value ends the left subtree of every popped ancestor
            // and takes its place to the right; the deepest popped ancestor is
            // the new bound.
            while matches!(stack.last(), Some(&top) if top < value) {
                low = stack.pop().unwrap();
            }
            stack.push(value);
        }
        true
    }
}
