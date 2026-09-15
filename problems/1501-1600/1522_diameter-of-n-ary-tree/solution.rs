impl Solution {
    pub fn diameter(root: Option<Box<Node>>) -> i32 {
        let root = match root {
            Some(root) => root,
            None => return 0,
        };
        // best tracks the widest bend seen anywhere: the two tallest child
        // arms through some node plus the two edges that join them.
        let mut best = 0;
        height(&root, &mut best);
        best
    }
}

/// Returns the node's height -- its longest downward arm in edges --
/// folding the bend through each node into best on the way out.
fn height(node: &Node, best: &mut i32) -> i32 {
    let mut first = -1;
    let mut second = -1;
    for child in &node.children {
        if let Some(child) = child {
            let arm = height(child, best);
            if arm > first {
                second = first;
                first = arm;
            } else if arm > second {
                second = arm;
            }
        }
    }
    *best = (*best).max(first + second + 2);
    first + 1
}
