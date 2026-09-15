// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // One breadth-first sweep borrows each level into a Vec<&TreeNode>,
    // swapping a fresh level vector in per round and never recursing: a
    // degenerate tree runs 10^5 nodes deep. A level holds at most 10^5
    // nodes worth up to 10^6 each, so sums reach 10^11 and overflow
    // i32 — they accumulate as i64.
    pub fn kth_largest_level_sum(root: Option<Box<TreeNode>>, k: i32) -> i64 {
        let mut sums: Vec<i64> = Vec::new();
        let mut level: Vec<&TreeNode> = vec![root.as_deref().unwrap()];
        while !level.is_empty() {
            let mut next: Vec<&TreeNode> = Vec::new();
            let mut total: i64 = 0;
            for node in level {
                total += node.val as i64;
                if let Some(child) = node.left.as_deref() {
                    next.push(child);
                }
                if let Some(child) = node.right.as_deref() {
                    next.push(child);
                }
            }
            sums.push(total);
            level = next;
        }
        if sums.len() < k as usize {
            return -1;
        }
        sums.sort_by(|a, b| b.cmp(a));
        sums[k as usize - 1]
    }
}
