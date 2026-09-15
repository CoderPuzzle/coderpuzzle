impl Solution {
    pub fn swap_nodes(head: Option<Box<ListNode>>, k: i32) -> Option<Box<ListNode>> {
        // Rust forbids two live cursors in one Box chain, so the meeting
        // of the two pointers is staged over plain indices instead: one
        // sweep counts the nodes n, which pins both targets — the kth
        // from the front at 0-based k - 1 and the kth from the end at
        // 0-based n - k.
        let mut count = 0;
        let mut current = &head;
        while let Some(node) = current {
            count += 1;
            current = &node.next;
        }
        let front = k - 1;
        let back = count - k;
        let (low, high) = if front <= back { (front, back) } else { (back, front) };
        // Whichever target sits earlier is reached first and its value
        // pocketed; the walk then continues to the later target, which
        // takes the pocketed value and gives up its own.
        let mut head = head;
        let mut cursor = &mut head;
        for _ in 0..low {
            cursor = &mut cursor.as_mut().unwrap().next;
        }
        let low_val = cursor.as_ref().unwrap().val;
        for _ in 0..(high - low) {
            cursor = &mut cursor.as_mut().unwrap().next;
        }
        let high_val = cursor.as_ref().unwrap().val;
        cursor.as_mut().unwrap().val = low_val;
        // A final walk returns the later target's old value to the earlier
        // node; when the targets coincide (n = 2k - 1) both writes land on
        // the same middle node and change nothing.
        let mut cursor = &mut head;
        for _ in 0..low {
            cursor = &mut cursor.as_mut().unwrap().next;
        }
        cursor.as_mut().unwrap().val = high_val;
        head
    }
}
