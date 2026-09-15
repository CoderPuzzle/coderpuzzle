use std::collections::BinaryHeap;

// Heap entry: value, input position (the tie-break, which also keeps the
// ordering from ever looking at the nodes themselves), and the owned head.
struct Entry {
    val: i32,
    position: usize,
    node: Box<ListNode>,
}

// BinaryHeap pops its maximum, so every comparison is reversed: the entry
// with the smallest (val, position) compares as the "greatest".
impl PartialEq for Entry {
    fn eq(&self, other: &Self) -> bool {
        (self.val, self.position) == (other.val, other.position)
    }
}
impl Eq for Entry {}
impl PartialOrd for Entry {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}
impl Ord for Entry {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        other.val.cmp(&self.val).then(other.position.cmp(&self.position))
    }
}

impl Solution {
    pub fn merge_k_lists(lists: Vec<Option<Box<ListNode>>>) -> Option<Box<ListNode>> {
        // Min-heap holding each surviving list's current head, keyed by
        // (value, input position): the next node of the output is always the
        // smallest head, and each list keeps exactly one entry in the heap.
        let mut heap: BinaryHeap<Entry> = BinaryHeap::new();
        for (position, head) in lists.into_iter().enumerate() {
            if let Some(node) = head {
                heap.push(Entry {
                    val: node.val,
                    position,
                    node,
                });
            }
        }
        // Dummy head: every attachment happens the same way and the real
        // head falls out as dummy.next.
        let mut dummy = Box::new(ListNode { val: 0, next: None });
        let mut tail = &mut dummy;
        while let Some(entry) = heap.pop() {
            // Detach the node's own tail first so the rest of its list can
            // go back into the heap for later rounds.
            let mut node = entry.node;
            let next = node.next.take();
            tail.next = Some(node);
            tail = tail.next.as_mut().unwrap();
            // The node's own list continues through its successor, which
            // re-enters the heap as that list's new single entry.
            if let Some(next_node) = next {
                heap.push(Entry {
                    val: next_node.val,
                    position: entry.position,
                    node: next_node,
                });
            }
        }
        // Every list ran dry inside the loop (each attached node's tail was
        // taken), so the chain is complete.
        dummy.next
    }
}
