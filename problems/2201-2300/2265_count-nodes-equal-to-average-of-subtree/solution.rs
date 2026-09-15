use std::collections::HashMap;

impl Solution {
    pub fn average_of_subtree(root: Option<Box<TreeNode>>) -> i32 {
        // Iterative post-order over an arena. The tree is first flattened
        // with an explicit stack that assigns each node a slot and records
        // child slots; then (sum, size) is folded bottom-up.
        struct Item {
            val: i32,
            left: Option<usize>,
            right: Option<usize>,
        }
        let mut items: Vec<Item> = Vec::new();
        // Flatten via pre-order using a work stack of owned subtrees plus the
        // parent slot and side to wire back.
        let mut stack: Vec<(Option<Box<TreeNode>>, usize, u8)> = vec![(root, usize::MAX, 0)];
        while let Some((boxed, parent, side)) = stack.pop() {
            match boxed {
                Some(mut node) => {
                    let idx = items.len();
                    items.push(Item {
                        val: node.val,
                        left: None,
                        right: None,
                    });
                    if parent != usize::MAX {
                        let parent_ref = &mut items[parent];
                        if side == 0 {
                            parent_ref.left = Some(idx);
                        } else {
                            parent_ref.right = Some(idx);
                        }
                    }
                    // Take children out of the box before it drops.
                    let left = node.left.take();
                    let right = node.right.take();
                    stack.push((right, idx, 1));
                    stack.push((left, idx, 0));
                }
                None => {}
            }
        }
        // Bottom-up fold: process indices in reverse pre-order so children
        // come before parents.
        let mut sums: HashMap<usize, i64> = HashMap::new();
        let mut sizes: HashMap<usize, i64> = HashMap::new();
        let mut count = 0;
        for i in (0..items.len()).rev() {
            let mut s = items[i].val as i64;
            let mut n = 1i64;
            if let Some(l) = items[i].left {
                s += sums[&l];
                n += sizes[&l];
            }
            if let Some(r) = items[i].right {
                s += sums[&r];
                n += sizes[&r];
            }
            sums.insert(i, s);
            sizes.insert(i, n);
            if s / n == items[i].val as i64 {
                count += 1;
            }
        }
        count
    }
}
