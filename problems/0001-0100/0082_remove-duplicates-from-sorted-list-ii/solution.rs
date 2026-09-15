impl Solution {
    pub fn delete_duplicates(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // A dummy node in front of the head makes deleting the original head
        // the same unlink as deleting any other node.
        let mut dummy = ListNode { val: 0, next: head };
        // tail marks the end of the kept prefix; the node after it is the
        // next one whose fate is still undecided.
        let mut tail = &mut dummy;
        while tail.next.is_some() {
            // That node leads a run of equals exactly when the node after
            // it repeats its value; decide before mutating anything.
            let value = tail.next.as_ref().unwrap().val;
            let starts_run = tail
                .next
                .as_ref()
                .unwrap()
                .next
                .as_ref()
                .map_or(false, |next| next.val == value);
            if starts_run {
                // take() pops each Box off the front of tail.next and hands
                // back the chain that remains, so every copy of the value is
                // dropped while tail itself stays put.
                while tail.next.as_ref().map_or(false, |node| node.val == value) {
                    tail.next = tail.next.take().unwrap().next;
                }
            } else {
                // Distinct from its successor (or last of the list): the
                // node survives and joins the kept prefix.
                tail = tail.next.as_mut().unwrap();
            }
        }
        dummy.next
    }
}
