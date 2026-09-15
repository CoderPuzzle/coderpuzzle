impl Solution {
    pub fn reorder_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Lists of length 0 or 1 are already in the target order.
        let mut head = head?;
        if head.next.is_none() {
            return Some(head);
        }
        // A Box chain cannot be walked by two cursors at once, so the
        // middle is located by measuring: the front half holds (n + 1) / 2
        // nodes and `front_tail` stops on its last one.
        let mut n = 1;
        {
            let mut node = head.next.as_ref();
            while let Some(next) = node {
                node = next.next.as_ref();
                n += 1;
            }
        }
        let mut front_tail = &mut head;
        for _ in 0..(n + 1) / 2 - 1 {
            front_tail = front_tail.next.as_mut().unwrap();
        }
        // Unhook the back half and reverse it: Box ownership makes the
        // reversal a chain of takes, each node moved out onto the growing
        // `reversed` chain that reads the back half backwards.
        let mut back = front_tail.next.take();
        let mut reversed: Option<Box<ListNode>> = None;
        while let Some(mut node) = back {
            back = node.next.take();
            node.next = reversed;
            reversed = Some(node);
        }
        // Weave: each front node hands its successor to the current back
        // node and takes that node in its place; the back chain, never
        // longer than the front, runs out first.
        let mut cursor = &mut head;
        let mut rest = reversed;
        while let Some(mut back_node) = rest {
            rest = back_node.next.take();
            let next_front = cursor.next.take();
            back_node.next = next_front;
            cursor.next = Some(back_node);
            match cursor.next.as_mut().unwrap().next.as_mut() {
                Some(next) => cursor = next,
                None => break,
            }
        }
        Some(head)
    }
}
