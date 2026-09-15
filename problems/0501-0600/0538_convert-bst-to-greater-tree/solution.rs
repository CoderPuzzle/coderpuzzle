use std::collections::HashMap;

// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn convert_bst(mut root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        // Reverse inorder — right subtree, node, left subtree — visits a
        // BST's keys in strictly descending order, so when the walk reaches
        // a node, every key greater than it has already been seen: the
        // running total it carries is exactly that node's new value. Rust's
        // tree nodes are owned Boxes, so a traversal stack cannot hold live
        // &mut references alongside the cursor; the rewrite therefore works
        // on VALUES, recorded here and written back by a second walk below.
        // Keying the map on the original value is faithful because the
        // statement guarantees every key in the tree is unique.
        let mut updates: HashMap<i32, i32> = HashMap::new();
        {
            let mut total = 0;
            let mut stack: Vec<&TreeNode> = Vec::new();
            let mut node = root.as_deref();
            while node.is_some() || !stack.is_empty() {
                // Descend the right spine stacking every node, then visit
                // each popped node and descend its left child. The tree may
                // be a single 10^4-node chain, whose walk would nest 10000
                // calls — past the call stack's hold, and past the
                // recursive drop of its boxes.
                while let Some(current) = node {
                    stack.push(current);
                    node = current.right.as_deref();
                }
                let current = stack.pop().unwrap();
                total += current.val;
                updates.insert(current.val, total);
                node = current.left.as_deref();
            }
        }
        // Keys lie in [-10^4, 10^4] and are unique, so the totals never
        // pass 50005000 in magnitude; i32 holds them with room to spare.
        let mut to_visit: Vec<&mut TreeNode> = Vec::new();
        let mut node = root.as_deref_mut();
        while let Some(current) = node {
            if let Some(value) = updates.get(&current.val) {
                current.val = *value;
            }
            let mut next = current.left.as_deref_mut();
            if let Some(right) = current.right.as_deref_mut() {
                to_visit.push(right);
            }
            if next.is_none() {
                next = to_visit.pop();
            }
            node = next;
        }
        root
    }
}
