impl Solution {
    pub fn merge_in_between(
        list1: Option<Box<ListNode>>,
        a: i32,
        b: i32,
        list2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        // Rust forbids two live cursors in one Box chain, so the walks run
        // one after the other instead of interleaved: first walk to the bth
        // node and take the segment from the (b+1)th node out of the chain
        // — the survivor, held by value while the front is rebuilt.
        let mut list1 = list1;
        let mut cursor = list1.as_mut().unwrap();
        for _ in 0..b {
            cursor = cursor.next.as_mut().unwrap();
        }
        let after = cursor.next.take();
        // Back at the front, a-1 steps reach the last node that keeps its
        // place in front of the removed stretch; list2 is hung off it,
        // releasing the old stretch.
        let mut pre = list1.as_mut().unwrap();
        for _ in 0..(a - 1) {
            pre = pre.next.as_mut().unwrap();
        }
        pre.next = list2;
        // list2's last node is found from the same cursor, and the survivor
        // is linked behind it; nothing outside the splice is touched.
        while pre.next.is_some() {
            pre = pre.next.as_mut().unwrap();
        }
        pre.next = after;
        list1
    }
}
