pub struct BSTIterator {
    // Ascending values collected once by an iterative in-order traversal
    // (explicit stack, so depth never risks the call stack). index points
    // at the current value, starting at -1 for "before the first value".
    values: Vec<i32>,
    index: i32,
}

impl BSTIterator {
    pub fn new(root: Option<Box<TreeNode>>) -> Self {
        let mut values = Vec::new();
        let mut stack: Vec<Box<TreeNode>> = Vec::new();
        let mut node = root;
        while !stack.is_empty() || node.is_some() {
            while let Some(mut boxed) = node {
                node = boxed.left.take();
                stack.push(boxed);
            }
            let mut current = stack.pop().expect("stack is non-empty here");
            values.push(current.val);
            node = current.right.take();
        }
        BSTIterator { values, index: -1 }
    }

    pub fn hasNext(&mut self) -> bool {
        (self.index + 1) < self.values.len() as i32
    }

    pub fn next(&mut self) -> i32 {
        self.index += 1;
        self.values[self.index as usize]
    }

    pub fn hasPrev(&mut self) -> bool {
        self.index > 0
    }

    pub fn prev(&mut self) -> i32 {
        self.index -= 1;
        self.values[self.index as usize]
    }
}
