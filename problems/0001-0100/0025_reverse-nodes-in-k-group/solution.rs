// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn reverse_k_group(head: Option<Box<ListNode>>, k: i32) -> Option<Box<ListNode>> {
        let mut dummy = Box::new(ListNode { val: 0, next: head });
        // group_prev names the node just before the group being reversed;
        // the dummy fills that role for the first group.
        let mut group_prev = &mut *dummy;
        'groups: loop {
            // Probe k nodes ahead; a short group means the leftover tail
            // stays as it is and the whole list is finished.
            let mut probe = &mut *group_prev;
            for _ in 0..k {
                match probe.next.as_deref_mut() {
                    Some(node) => probe = node,
                    None => break 'groups,
                }
            }
            // Detach the suffix and flip exactly k links onto `prev`, the
            // reversed group so far; `curr` keeps the unconsumed remainder.
            let mut curr = group_prev.next.take();
            let mut prev: Option<Box<ListNode>> = None;
            for _ in 0..k {
                let mut node = curr.take().unwrap();
                curr = node.next.take();
                node.next = prev;
                prev = Some(node);
            }
            // prev heads the reversed group; attach it, then walk k steps to
            // the old first node, which is the group's last node now.
            group_prev.next = prev;
            for _ in 0..k {
                group_prev = group_prev.next.as_deref_mut().unwrap();
            }
            // Reattach the remainder there: the leftover tail, already in
            // order, or the head of the next group to reverse.
            group_prev.next = curr;
        }
        dummy.next
    }
}
