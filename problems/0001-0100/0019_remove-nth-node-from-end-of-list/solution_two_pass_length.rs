impl Solution {
    pub fn remove_nth_from_end(head: Option<Box<ListNode>>, n: i32) -> Option<Box<ListNode>> {
        // First pass: count the nodes through a shared borrow, so the
        // target's position from the head is known before anything is
        // unlinked.
        let mut sz = 0;
        let mut node = head.as_ref();
        while let Some(cur) = node {
            sz += 1;
            node = cur.next.as_ref();
        }
        // The target is the (sz - n + 1)-th node from the head, so its
        // predecessor sits sz - n steps past the dummy; walking a mutable
        // cursor that far and relinking drops the target without a special
        // head case.
        let cut = sz - n;
        let mut dummy = Box::new(ListNode { val: 0, next: head });
        let mut pred = &mut dummy;
        for _ in 0..cut {
            pred = pred.next.as_mut().unwrap();
        }
        pred.next = pred.next.take().unwrap().next;
        dummy.next
    }
}
