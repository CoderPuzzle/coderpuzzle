impl Solution {
    pub fn plus_one(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // A 0 sentinel absorbs the all-9 carry, so the list growing past
        // its head needs no special case.
        let mut sentinel = Box::new(ListNode { val: 0, next: head });
        // Pass 1: a +1 carry can only ever reach the LAST non-9 digit, so
        // all the walk must remember is how far that digit sits from the
        // sentinel (0 = the sentinel itself, i.e. every digit is a 9).
        // Ownership forbids holding a second live reference mid-walk.
        let mut best = 0;
        let mut steps = 0;
        let mut cursor = sentinel.next.as_deref();
        while let Some(node) = cursor {
            steps += 1;
            if node.val != 9 {
                best = steps;
            }
            cursor = node.next.as_deref();
        }
        // Pass 2: step onto that digit, increment it, and roll every 9
        // behind it to 0.
        let mut last = &mut *sentinel;
        for _ in 0..best {
            last = last.next.as_deref_mut().unwrap();
        }
        last.val += 1;
        while last.next.is_some() {
            last = last.next.as_deref_mut().unwrap();
            last.val = 0;
        }
        // The sentinel still holds 0 unless every digit was a 9.
        if sentinel.val == 1 {
            Some(sentinel)
        } else {
            sentinel.next.take()
        }
    }
}
