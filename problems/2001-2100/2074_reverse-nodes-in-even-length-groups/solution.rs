impl Solution {
    pub fn reverse_even_length_groups(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut dummy = Box::new(ListNode { val: 0, next: head });
        let mut before = &mut *dummy;
        let mut target_length = 1_usize;

        while before.next.is_some() {
            let actual_length = {
                let mut count = 0_usize;
                let mut scan = before.next.as_deref();
                while count < target_length {
                    let Some(node) = scan else {
                        break;
                    };
                    count += 1;
                    scan = node.next.as_deref();
                }
                count
            };

            if actual_length % 2 == 0 {
                let mut current = before.next.take();
                let mut reversed = None;
                for _ in 0..actual_length {
                    let mut node = current.take().unwrap();
                    current = node.next.take();
                    node.next = reversed;
                    reversed = Some(node);
                }
                before.next = reversed;
                for _ in 0..actual_length {
                    before = before.next.as_deref_mut().unwrap();
                }
                before.next = current;
            } else {
                for _ in 0..actual_length {
                    before = before.next.as_deref_mut().unwrap();
                }
            }
            target_length += 1;
        }

        dummy.next
    }
}
