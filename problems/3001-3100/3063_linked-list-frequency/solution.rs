use std::collections::HashMap;

impl Solution {
    pub fn frequencies_of_elements(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut counts: HashMap<i32, i32> = HashMap::new();
        let mut order: Vec<i32> = Vec::new();
        let mut current = &head;
        while let Some(node) = current {
            *counts.entry(node.val).or_insert(0) += 1;
            if counts[&node.val] == 1 {
                order.push(node.val);
            }
            current = &node.next;
        }

        let mut result = None;
        let mut tail = &mut result;
        for value in order {
            *tail = Some(Box::new(ListNode::new(counts[&value])));
            tail = &mut tail.as_mut().unwrap().next;
        }
        result
    }
}
