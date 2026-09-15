// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn is_sub_path(head: Option<Box<ListNode>>, root: Option<Box<TreeNode>>) -> bool {
        // Flatten the list once so matching works with plain indices.
        let mut values = Vec::new();
        let mut node = head.as_deref();
        while let Some(current) = node {
            values.push(current.val);
            node = current.next.as_deref();
        }
        let root = match root {
            Some(node) => node,
            None => return false,
        };

        // Walk the whole tree; from every node that starts a match, follow it
        // downward with an explicit (node, index) stack. Borrowed references
        // keep the traversal aliasing-free.
        let mut stack: Vec<&TreeNode> = vec![&root];
        while let Some(tree_node) = stack.pop() {
            if Self::match_from(tree_node, &values) {
                return true;
            }
            for child in [&tree_node.left, &tree_node.right] {
                if let Some(child) = child {
                    stack.push(child.as_ref());
                }
            }
        }
        false
    }

    fn match_from<'a>(start: &'a TreeNode, values: &[i32]) -> bool {
        if values.is_empty() || start.val != values[0] {
            return false;
        }
        let mut stack: Vec<(&TreeNode, usize)> = vec![(start, 0)];
        while let Some((node, index)) = stack.pop() {
            if index + 1 == values.len() {
                return true;
            }
            let nxt = values[index + 1];
            for child in [&node.left, &node.right] {
                if let Some(child) = child {
                    if child.val == nxt {
                        stack.push((child.as_ref(), index + 1));
                    }
                }
            }
        }
        false
    }
}
