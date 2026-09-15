impl Solution {
    pub fn add_two_numbers(l1: Option<Box<ListNode>>, l2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut l1 = l1;
        let mut l2 = l2;
        // Dummy head anchors the result list so the first node is not a
        // special case; tail always points at the last node built.
        let mut dummy = Box::new(ListNode { val: 0, next: None });
        let mut tail: &mut ListNode = &mut dummy;
        let mut carry = 0;
        // One loop condition covers all edge cases at once: lists of unequal
        // length and a leftover final carry (5 + 5 -> [0, 1]).
        while l1.is_some() || l2.is_some() || carry != 0 {
            // A list that has run out simply contributes nothing.
            let mut total = carry;
            if let Some(node) = l1 {
                total += node.val;
                l1 = node.next;
            }
            if let Some(node) = l2 {
                total += node.val;
                l2 = node.next;
            }
            // Split the column total into the new carry and the digit to append.
            carry = total / 10;
            tail.next = Some(Box::new(ListNode {
                val: total % 10,
                next: None,
            }));
            tail = tail.next.as_mut().unwrap();
        }
        // Both inputs are exhausted and the carry is zero: the sum is complete.
        dummy.next
    }
}
