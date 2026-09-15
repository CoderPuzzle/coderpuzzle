use std::collections::HashSet;

impl Solution {
    pub fn modified_list(nums: Vec<i32>, head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // O(1) membership tests: the set holds every value of nums once.
        let remove: HashSet<i32> = nums.into_iter().collect();
        // A dummy head stands in front of the real list, so deleting the
        // original head is an ordinary unlink of somebody's successor.
        // Ownership forbids holding a node and its successor live at once,
        // so the walk peeks by shared reference and splices matches out.
        let mut dummy = ListNode::new(0);
        dummy.next = head;
        let mut current = &mut dummy;
        while current.next.is_some() {
            if remove.contains(&current.next.as_ref().unwrap().val) {
                // Skip the matching node. The cursor stays put — the node
                // behind it may match too, and that node is now current.next.
                current.next = current.next.take().unwrap().next;
            } else {
                // A keeper: step onto it and look at what follows.
                current = current.next.as_mut().unwrap();
            }
        }
        dummy.next
    }
}
