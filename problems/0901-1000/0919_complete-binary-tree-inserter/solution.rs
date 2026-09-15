use std::collections::VecDeque;

pub struct CBTInserter {
    // Level-order values of the complete tree. In a complete tree the
    // level order fixes the shape — children of i sit at 2i+1 and 2i+2 —
    // so the value Vec stands in for the node graph Rust could not lend
    // links out of.
    values: Vec<i32>,
    // Level-order indices of the nodes that still have a free child slot;
    // the front is always the parent of the next complete position.
    pending: VecDeque<usize>,
}

impl CBTInserter {
    // One iterative breadth-first pass borrows the nodes, records each
    // value, and queues the index of every node with a free slot. BFS
    // visits parents left-to-right, so the queue order is level order.
    pub fn new(root: Option<Box<TreeNode>>) -> Self {
        let mut values = Vec::new();
        let mut pending = VecDeque::new();
        let mut queue: VecDeque<&TreeNode> = VecDeque::new();
        if let Some(node) = root.as_deref() {
            queue.push_back(node);
        }
        while let Some(node) = queue.pop_front() {
            values.push(node.val);
            if node.left.is_none() || node.right.is_none() {
                pending.push_back(values.len() - 1);
            }
            if let Some(child) = node.left.as_deref() {
                queue.push_back(child);
            }
            if let Some(child) = node.right.as_deref() {
                queue.push_back(child);
            }
        }
        CBTInserter { values, pending }
    }

    pub fn insert(&mut self, v: i32) -> i32 {
        let parent = *self.pending.front().expect("a complete tree has a next parent");
        self.values.push(v);
        let child = self.values.len() - 1;
        self.pending.push_back(child);
        if child % 2 == 0 {
            // even index: the right child 2p+2 — the parent just filled
            // both slots and leaves the queue
            self.pending.pop_front();
        }
        self.values[parent]
    }

    // Materialize the tree the wire wants: shells for every level-order
    // value, each linked to its parent (odd index -> left of (i-1)/2,
    // even -> right of i/2-1) in one reverse pass, so every child subtree
    // is whole before its parent adopts it.
    pub fn get_root(&mut self) -> Option<Box<TreeNode>> {
        if self.values.is_empty() {
            return None;
        }
        let mut shells: Vec<Option<Box<TreeNode>>> = self
            .values
            .iter()
            .map(|&value| Some(Box::new(TreeNode::new(value))))
            .collect();
        for index in (1..shells.len()).rev() {
            let child = shells[index].take().unwrap();
            if index % 2 == 1 {
                shells[(index - 1) / 2].as_mut().unwrap().left = Some(child);
            } else {
                shells[index / 2 - 1].as_mut().unwrap().right = Some(child);
            }
        }
        shells[0].take()
    }
}
