use std::collections::HashMap;

impl Solution {
    pub fn diameter(root: Option<Box<Node>>) -> i32 {
        let root = match root {
            Some(root) => root,
            None => return 0,
        };

        // Pass one: every node's height -- its longest downward arm in
        // edges -- materialized into a table keyed by the node. The tree
        // is never moved between the passes, so node addresses are keys.
        let mut height: HashMap<*const Node, i32> = HashMap::new();
        measure(&root, &mut height);

        // Pass two: the widest bend at each node pairs its two tallest
        // child arms; absent arms read -1, so a leaf scores 0.
        let mut best = 0;
        let mut stack: Vec<&Node> = vec![&root];
        while let Some(node) = stack.pop() {
            let mut first = -1;
            let mut second = -1;
            for child in &node.children {
                if let Some(child) = child {
                    stack.push(child);
                    let arm = height[&(&**child as *const Node)];
                    if arm > first {
                        second = first;
                        first = arm;
                    } else if arm > second {
                        second = arm;
                    }
                }
            }
            best = best.max(first + second + 2);
        }
        best
    }
}

fn measure(node: &Node, height: &mut HashMap<*const Node, i32>) -> i32 {
    let mut tallest = -1;
    for child in &node.children {
        if let Some(child) = child {
            tallest = tallest.max(measure(child, height));
        }
    }
    height.insert(node as *const Node, tallest + 1);
    tallest + 1
}
