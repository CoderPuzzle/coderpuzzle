// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::HashMap;

impl Solution {
    pub fn subtree_with_all_deepest(root: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        // Pass one, by shared reference: measure every subtree's height.
        // A node can only be measured once both of its children are, so
        // the walk is post-order on an explicit (node, measured) stack —
        // the first pop schedules a node's merge beneath its children,
        // the second performs it — keeping a 500-node chain's ~500 merges
        // off the call stack. Heights are keyed by node address.
        fn addr(node: &TreeNode) -> usize {
            node as *const TreeNode as usize
        }
        let mut heights: HashMap<usize, i32> = HashMap::new();
        let mut stack: Vec<(&TreeNode, bool)> = Vec::new();
        if let Some(node) = root.as_deref() {
            stack.push((node, false));
        }
        while let Some((node, measured)) = stack.pop() {
            if !measured {
                stack.push((node, true));
                if let Some(child) = node.right.as_deref() {
                    stack.push((child, false));
                }
                if let Some(child) = node.left.as_deref() {
                    stack.push((child, false));
                }
                continue;
            }
            let lh = node.left.as_deref().map_or(0, |child| heights[&addr(child)]);
            let rh = node.right.as_deref().map_or(0, |child| heights[&addr(child)]);
            heights.insert(addr(node), 1 + lh.max(rh));
        }
        // Pass two, by ownership. Rust's nodes are owned boxes, so a
        // subtree cannot be handed back while it still sits inside its
        // parent — the answer is extracted by walking ownership down
        // from the root instead. Equal child heights mean each side
        // reaches this subtree's deepest level, so its deepest nodes sit
        // on both sides and only this node covers them all: return it
        // with its whole subtree intact. Unequal heights mean no deepest
        // node can live in the shallower side: step into the deeper
        // child, letting the node and the shallower subtree drop.
        let mut current = root;
        while let Some(mut node) = current {
            let lh = node.left.as_deref().map_or(0, |child| heights[&addr(child)]);
            let rh = node.right.as_deref().map_or(0, |child| heights[&addr(child)]);
            if lh == rh {
                return Some(node);
            }
            current = if lh > rh { node.left.take() } else { node.right.take() };
        }
        None
    }
}
