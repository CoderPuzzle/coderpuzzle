// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn recover_tree(mut root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        // Rust's tree nodes are owned Boxes, so two live &mut references into
        // one walk are not safely expressible; the swap therefore works on
        // VALUES, recorded here and written back by a second walk below.
        // Phase 1 — read-only iterative inorder (a shared-reference stack,
        // as ever): inorder of a healthy BST is strictly ascending, so a
        // predecessor greater than its successor marks a misplaced pair: the
        // value before the FIRST descent and after the LAST descent.
        let mut first: Option<i32> = None;
        let mut second: Option<i32> = None;
        {
            let mut stack: Vec<&TreeNode> = Vec::new();
            let mut node = root.as_deref();
            let mut prev: Option<i32> = None;
            // `prev` as an Option keeps a genuine i32::MIN value from being
            // mistaken for a "no predecessor yet" sentinel.
            while node.is_some() || !stack.is_empty() {
                while let Some(current) = node {
                    stack.push(current);
                    node = current.left.as_deref();
                }
                let current = stack.pop().unwrap();
                if let Some(value) = prev {
                    if value > current.val {
                        first.get_or_insert(value);
                        second = Some(current.val);
                    }
                }
                prev = Some(current.val);
                node = current.right.as_deref();
            }
        }
        // Phase 2 — write the two values back. Matching values (not node
        // positions) makes any full walk sufficient; preorder keeps the two
        // child reborrows on disjoint fields, which the borrow checker can
        // prove safe. Owning `root` by value is the in-place contract: the
        // same tree, repaired, flows back out.
        let (first, second) = match (first, second) {
            (Some(first), Some(second)) => (first, second),
            // The statement guarantees exactly two swapped nodes, so this
            // arm exists only to keep the walk total.
            _ => return root,
        };
        let mut to_visit: Vec<&mut TreeNode> = Vec::new();
        let mut node = root.as_deref_mut();
        while let Some(current) = node {
            if current.val == first {
                current.val = second;
            } else if current.val == second {
                current.val = first;
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
