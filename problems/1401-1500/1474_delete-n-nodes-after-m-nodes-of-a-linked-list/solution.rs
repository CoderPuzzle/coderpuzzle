impl Solution {
    pub fn delete_nodes(head: Option<Box<ListNode>>, m: i32, n: i32) -> Option<Box<ListNode>> {
        // A dummy node in front of the head gives every cycle the same
        // starting position: a cursor standing on the keep run's last node.
        let mut dummy = Box::new(ListNode { val: 0, next: head });
        let mut cursor = dummy.as_mut();
        while cursor.next.is_some() {
            // Keep the next m nodes: advance onto every node the run keeps;
            // a run cut short by the tail simply leaves the cursor there.
            let mut kept = 0;
            while kept < m && cursor.next.is_some() {
                cursor = cursor.next.as_deref_mut().unwrap();
                kept += 1;
            }
            // Drop the next n nodes. Ownership rules out a second skipping
            // cursor borrowing alongside this one, so the run leaves one
            // node at a time; the sweep is the same single pass either way.
            let mut dropped = 0;
            while dropped < n && cursor.next.is_some() {
                cursor.next = cursor.next.take().unwrap().next;
                dropped += 1;
            }
        }
        dummy.next
    }
}
