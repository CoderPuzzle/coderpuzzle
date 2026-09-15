// bundle-provided type (not editable here; the judge assembles its definition
// into every submission):
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::HashMap;

struct ZigFrame {
    id: usize,
    node: *const TreeNode,
    state: u8,
}

impl Solution {
    pub fn longest_zig_zag(root: Option<Box<TreeNode>>) -> i32 {
        // Decompose into an arena so post-order bookkeeping needs no
        // borrow gymnastics: vals/lefts/rights indexed by preorder id.
        struct Arena {
            lefts: Vec<Option<usize>>,
            rights: Vec<Option<usize>>,
        }
        let mut vals: Vec<i32> = Vec::new();
        let mut arena = Arena {
            lefts: Vec::new(),
            rights: Vec::new(),
        };

        struct Build<'a> {
            vals: &'a mut Vec<i32>,
            arena: &'a mut Arena,
        }
        impl<'a> Build<'a> {
            fn walk(&mut self, node: &TreeNode) -> usize {
                let id = self.vals.len();
                self.vals.push(node.val);
                self.arena.lefts.push(None);
                self.arena.rights.push(None);
                if let Some(left) = node.left.as_ref() {
                    let child = self.walk(left);
                    self.arena.lefts[id] = Some(child);
                }
                if let Some(right) = node.right.as_ref() {
                    let child = self.walk(right);
                    self.arena.rights[id] = Some(child);
                }
                id
            }
        }
        if let Some(root_node) = root.as_ref() {
            Build {
                vals: &mut vals,
                arena: &mut arena,
            }
            .walk(root_node);
        } else {
            return 0;
        }

        let n = vals.len();
        // Iterative reverse-preorder post-order: children first, then node.
        let mut runs_left = vec![0i32; n]; // run arriving moving left
        let mut runs_right = vec![0i32; n]; // run arriving moving right
        let mut best = 0;
        let mut stack: Vec<(usize, u8)> = Vec::new();
        stack.push((0, 0));
        let mut order: Vec<usize> = Vec::with_capacity(n);
        while let Some((id, state)) = stack.pop() {
            if state == 1 {
                order.push(id);
                continue;
            }
            stack.push((id, 1));
            if let Some(child) = arena.lefts[id] {
                stack.push((child, 0));
            }
            if let Some(child) = arena.rights[id] {
                stack.push((child, 0));
            }
        }
        for id in order {
            let left_run = arena.lefts[id].map_or(0, |c| 1 + runs_right[c]);
            let right_run = arena.rights[id].map_or(0, |c| 1 + runs_left[c]);
            runs_left[id] = left_run;
            runs_right[id] = right_run;
            best = best.max(left_run).max(right_run);
        }
        best
    }
}
