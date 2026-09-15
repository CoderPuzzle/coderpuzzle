impl Solution {
    pub fn odd_even_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Two chains grow inside the original nodes: each pass takes one
        // pair off the front — a node onto the odd chain, the next onto the
        // even chain — so ownership only ever sees take() and append.
        let mut rest = head;
        let mut odd_chain = None;
        let mut even_chain = None;
        // Tail cursors name the slot each chain currently ends in.
        let mut odd_tail = &mut odd_chain;
        let mut even_tail = &mut even_chain;
        while let Some(mut odd_node) = rest.take() {
            rest = odd_node.next.take();
            *odd_tail = Some(odd_node);
            odd_tail = &mut odd_tail.as_mut().unwrap().next;
            match rest.take() {
                Some(mut even_node) => {
                    rest = even_node.next.take();
                    *even_tail = Some(even_node);
                    even_tail = &mut even_tail.as_mut().unwrap().next;
                }
                // Odd length: the final node stays on the odd chain.
                None => break,
            }
        }
        // Splice the even chain after the odd tail.
        *odd_tail = even_chain;
        odd_chain
    }
}
