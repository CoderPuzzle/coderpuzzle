impl Solution {
    pub fn is_preorder(nodes: Vec<Vec<i32>>) -> bool {
        // Stack of ancestors whose subtrees are still open. Popping until the
        // parent surfaces closes every subtree finished since the last visit;
        // an empty stack before that means the parent is gone for good.
        let mut stack: Vec<i32> = Vec::with_capacity(nodes.len());
        for (i, node) in nodes.iter().enumerate() {
            let (node_id, parent_id) = (node[0], node[1]);
            if i == 0 {
                if parent_id != -1 {
                    return false;
                }
            } else {
                while let Some(&top) = stack.last() {
                    if top == parent_id {
                        break;
                    }
                    stack.pop();
                }
                if stack.is_empty() {
                    return false;
                }
            }
            stack.push(node_id);
        }
        true
    }
}
