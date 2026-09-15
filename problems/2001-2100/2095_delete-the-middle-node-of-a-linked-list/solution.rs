impl Solution {
    pub fn delete_middle(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut length = 0_usize;
        let mut current = &head;
        while let Some(node) = current {
            length += 1;
            current = &node.next;
        }

        let mut head = head;
        let mut middle = &mut head;
        for _ in 0..length / 2 {
            middle = &mut middle.as_mut().unwrap().next;
        }
        let removed = middle.take().unwrap();
        *middle = removed.next;
        head
    }
}
