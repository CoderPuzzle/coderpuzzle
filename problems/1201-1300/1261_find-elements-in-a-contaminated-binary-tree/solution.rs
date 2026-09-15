use std::collections::HashSet;

pub struct FindElements {
    // Values recovered from the tree at construction. The Box tree is
    // consumed by `new`, so a value set answers every later query.
    values: HashSet<i32>,
}

impl FindElements {
    // Constructor: consume the owned tree, recover values with an
    // explicit-stack DFS. The root is 0; a child of x is 2x + 1 (left)
    // or 2x + 2 (right).
    pub fn new(root: Option<Box<TreeNode>>) -> Self {
        let mut values = HashSet::new();
        if let Some(head) = root {
            // Stack of (node, recovered value); owned nodes are taken
            // apart as the walk descends.
            let mut stack: Vec<(Box<TreeNode>, i32)> = vec![(head, 0)];
            while let Some((node, v)) = stack.pop() {
                values.insert(v);
                if let Some(left) = node.left {
                    stack.push((left, 2 * v + 1));
                }
                if let Some(right) = node.right {
                    stack.push((right, 2 * v + 2));
                }
            }
        }
        FindElements { values }
    }

    pub fn find(&mut self, target: i32) -> bool {
        self.values.contains(&target)
    }
}
