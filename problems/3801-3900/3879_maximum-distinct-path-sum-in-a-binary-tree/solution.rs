// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::HashMap;
use std::collections::HashSet;

impl Solution {
    // Parent pointers let the DFS move up as well as down. Trying every node
    // as a path start, the search only enters a neighbor whose value is not
    // already on the current path — the seen set alone blocks the way back to
    // the parent, since the parent is always on the path. Iterative with
    // enter/exit markers, so a 1000-node chain cannot blow the call stack.
    pub fn max_sum(root: Option<Box<TreeNode>>) -> i32 {
        let root = root.unwrap();
        let mut parent: HashMap<*const TreeNode, *const TreeNode> = HashMap::new();
        let mut nodes: Vec<*const TreeNode> = Vec::new();
        let mut pending: Vec<*const TreeNode> = vec![&*root];
        parent.insert(&*root, std::ptr::null());
        while let Some(node) = pending.pop() {
            nodes.push(node);
            unsafe {
                if let Some(left) = &(*node).left {
                    parent.insert(&**left, node);
                    pending.push(&**left);
                }
                if let Some(right) = &(*node).right {
                    parent.insert(&**right, node);
                    pending.push(&**right);
                }
            }
        }
        let mut best = -1_000_000_000i32;
        for &start in &nodes {
            let mut seen: HashSet<i32> = HashSet::new();
            // (node, sum, phase) — phase 0 enter, 1 exit
            let mut st: Vec<(*const TreeNode, i32, i32)> = vec![(start, unsafe { (*start).val }, 0)];
            while let Some((node, s, phase)) = st.pop() {
                if phase == 1 {
                    unsafe {
                        seen.remove(&(*node).val);
                    }
                    continue;
                }
                unsafe {
                    seen.insert((*node).val);
                }
                if s > best {
                    best = s;
                }
                st.push((node, s, 1));
                unsafe {
                    let neighbors = [
                        (*node).left.as_ref().map(|b| &**b as *const TreeNode),
                        (*node).right.as_ref().map(|b| &**b as *const TreeNode),
                        parent.get(&node).copied().filter(|p| !p.is_null()),
                    ];
                    for next in neighbors.into_iter().flatten() {
                        if !seen.contains(&(*next).val) {
                            st.push((next, s + (*next).val, 0));
                        }
                    }
                }
            }
        }
        best
    }
}
