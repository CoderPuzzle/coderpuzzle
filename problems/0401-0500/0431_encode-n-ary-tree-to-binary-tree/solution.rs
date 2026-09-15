impl Solution {
    pub fn encode(root: Option<Box<Node>>) -> Option<Box<TreeNode>> {
        let root = root?;
        // Shells first, breadth-first: each n-ary node gets a TreeNode and
        // its group contributes one edge per child — first child to the
        // parent's left, later children to the previous sibling's right.
        let mut shells: Vec<TreeNode> = vec![TreeNode::new(root.val)];
        let mut edges: Vec<(usize, usize, bool)> = Vec::new();
        let mut queue: std::collections::VecDeque<(&Node, usize)> = std::collections::VecDeque::new();
        queue.push_back((&root, 0));
        while let Some((node, mine)) = queue.pop_front() {
            let mut prev: Option<usize> = None;
            for child in node.children.iter().flatten() {
                let child_shell = shells.len();
                shells.push(TreeNode::new(child.val));
                match prev {
                    None => edges.push((mine, child_shell, true)),
                    Some(prev) => edges.push((prev, child_shell, false)),
                }
                prev = Some(child_shell);
                queue.push_back((child, child_shell));
            }
        }
        // Indices stand in for the references a growing Vec cannot lend:
        // every node's edges are recorded after the edge that adopts it, so
        // replaying them in reverse completes each subtree before its parent
        // takes it.
        let mut pool: Vec<Option<TreeNode>> = shells.into_iter().map(Some).collect();
        for (parent, child, to_left) in edges.into_iter().rev() {
            let child = pool[child].take().unwrap();
            if to_left {
                pool[parent].as_mut().unwrap().left = Some(Box::new(child));
            } else {
                pool[parent].as_mut().unwrap().right = Some(Box::new(child));
            }
        }
        pool[0].take().map(Box::new)
    }
}
