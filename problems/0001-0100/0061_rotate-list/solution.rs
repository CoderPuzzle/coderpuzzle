impl Solution {
    pub fn rotate_right(head: Option<Box<ListNode>>, k: i32) -> Option<Box<ListNode>> {
        // An empty list has nothing to rotate — and no length to mod by.
        let mut head = head?;
        // A Box chain cannot hold a cycle, so the ring is never closed
        // here; the port splices instead. First, measure the list.
        let mut n = 1;
        {
            let mut node = head.next.as_ref();
            while let Some(next) = node {
                node = next.next.as_ref();
                n += 1;
            }
        }
        let k = (k as usize) % n;
        // A zero remainder leaves the list exactly as it arrived.
        if k == 0 {
            return Some(head);
        }
        // The new tail stands n - k steps from the head; taking its next
        // unhooks the rotated suffix without copying any node.
        let mut new_tail = &mut head;
        for _ in 0..n - k - 1 {
            new_tail = new_tail.next.as_mut().unwrap();
        }
        let mut new_head = new_tail.next.take().unwrap();
        // The suffix's end adopts the old front, finishing the rotation.
        let mut tail = &mut *new_head;
        while tail.next.is_some() {
            tail = tail.next.as_mut().unwrap();
        }
        tail.next = Some(head);
        Some(new_head)
    }
}
