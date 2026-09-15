// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn tree2str(root: Option<Box<TreeNode>>) -> String {
        // The answer is a preorder walk written under two paren rules: a
        // node with any child opens a group for it, and a group is dropped
        // only when the child is absent — except that an absent left child
        // beside a present right one leaves its "()" placeholder so the two
        // groups stay tell-apart. The stack interleaves those literal parens
        // with the pending nodes in exactly the order they must be written,
        // so one pop-and-emit loop produces the whole string.
        // Iterative on purpose: the 10'000-node chain the constraints allow
        // is far deeper than the judge's runtimes may recurse; the explicit
        // stack is one entry per pending node or paren and never nests a
        // call. Rust's nodes are owned Boxes, so a child is taken out whole
        // when its turn is pushed.
        enum Item {
            Node(Box<TreeNode>),
            Paren(char),
        }
        let mut result = String::new();
        let mut stack: Vec<Item> = Vec::new();
        if let Some(root) = root {
            stack.push(Item::Node(root));
        }
        while let Some(item) = stack.pop() {
            match item {
                Item::Paren(c) => result.push(c),
                Item::Node(mut node) => {
                    result.push_str(&node.val.to_string());
                    let has_left = node.left.is_some();
                    let has_right = node.right.is_some();
                    if has_left || has_right {
                        if has_right {
                            // The right group is written second, so it is
                            // pushed first and pops after the left group is
                            // finished.
                            stack.push(Item::Paren(')'));
                            stack.push(Item::Node(node.right.take().unwrap()));
                            stack.push(Item::Paren('('));
                            if !has_left {
                                // A right child with no left one: the empty
                                // pair marks where the left group would have
                                // been.
                                result.push_str("()");
                            }
                        }
                        if has_left {
                            stack.push(Item::Paren(')'));
                            stack.push(Item::Node(node.left.take().unwrap()));
                            stack.push(Item::Paren('('));
                        }
                    }
                }
            }
        }
        result
    }
}
