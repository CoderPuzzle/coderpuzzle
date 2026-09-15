// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn count_great_enough_nodes(root: Option<Box<TreeNode>>, k: i32) -> i32 {
        // Breadth-first numbering lays every node out so each child sits at
        // a larger index than its parent; visiting those indices backwards
        // is a stack-safe post-order (chains never touch the call depth).
        // Each node keeps the sorted list of its subtree's min(size, k)
        // smallest values: the pooled child lists plus its own value are
        // sorted and truncated, so a full subtree listing is never needed.
        let mut order: Vec<&TreeNode> = Vec::new();
        let mut kids: Vec<(Option<usize>, Option<usize>)> = Vec::new();
        if let Some(node) = root.as_deref() {
            order.push(node);
            kids.push((None, None));
        }
        let mut head = 0;
        while head < order.len() {
            let parent = head;
            head += 1;
            for (slot, child) in [
                (0usize, order[parent].left.as_deref()),
                (1usize, order[parent].right.as_deref()),
            ] {
                if let Some(child) = child {
                    if slot == 0 {
                        kids[parent].0 = Some(order.len());
                    } else {
                        kids[parent].1 = Some(order.len());
                    }
                    order.push(child);
                    kids.push((None, None));
                }
            }
        }

        // The kept list reaches length k exactly when the subtree holds at
        // least k nodes, and its last entry is then the subtree's k-th
        // smallest value counted with multiplicity: the node exceeds it iff
        // at least k actual nodes are strictly smaller — duplicates of the
        // node itself never pass.
        let need = k as usize;
        let mut lists: Vec<Vec<i32>> = vec![Vec::new(); order.len()];
        let mut great = 0;
        for i in (0..order.len()).rev() {
            let mut pooled = vec![order[i].val];
            for slot in [kids[i].0, kids[i].1] {
                if let Some(child) = slot {
                    pooled.append(&mut lists[child]);
                }
            }
            pooled.sort_unstable();
            pooled.truncate(need);
            if pooled.len() == need && order[i].val > *pooled.last().unwrap() {
                great += 1;
            }
            lists[i] = pooled;
        }
        great
    }
}
