pub struct BSTIterator {
    // Lazy in-order traversal via a left-spine stack of owned nodes: the
    // top is the smallest unvisited node and the stack never holds more
    // than one root-to-node path (O(h) memory).
    stack: Vec<Box<TreeNode>>,
}

impl BSTIterator {
    pub fn new(root: Option<Box<TreeNode>>) -> Self {
        let mut iterator = BSTIterator { stack: Vec::new() };
        iterator.push_spine(root);
        iterator
    }

    // Everything on this path is smaller than what lies below it, so the
    // last one pushed is the next value in order.
    fn push_spine(&mut self, mut node: Option<Box<TreeNode>>) {
        while let Some(mut boxed) = node {
            node = boxed.left.take();
            self.stack.push(boxed);
        }
    }

    pub fn next(&mut self) -> i32 {
        let mut node = self.stack.pop().expect("next on an exhausted iterator");
        // The popped node's right subtree holds the values that come next;
        // its left spine is the front of that block.
        let right = node.right.take();
        let value = node.val;
        self.push_spine(right);
        value
    }

    pub fn hasNext(&mut self) -> bool {
        !self.stack.is_empty()
    }
}
