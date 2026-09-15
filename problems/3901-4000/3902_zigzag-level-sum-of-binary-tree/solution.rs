// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn zigzag_level_sum(root: Option<Box<TreeNode>>) -> Vec<i64> {
        let mut frontier: Vec<Box<TreeNode>> = root.into_iter().collect();
        let mut answer = Vec::new();
        let mut odd = true;
        while !frontier.is_empty() {
            let mut total = 0i64;
            if odd {
                for node in &frontier {
                    if node.left.is_none() {
                        break;
                    }
                    total += node.val as i64;
                }
            } else {
                for node in frontier.iter().rev() {
                    if node.right.is_none() {
                        break;
                    }
                    total += node.val as i64;
                }
            }
            answer.push(total);
            let mut next = Vec::with_capacity(2 * frontier.len());
            for mut node in frontier {
                if let Some(child) = node.left.take() {
                    next.push(child);
                }
                if let Some(child) = node.right.take() {
                    next.push(child);
                }
            }
            frontier = next;
            odd = !odd;
        }
        answer
    }
}
