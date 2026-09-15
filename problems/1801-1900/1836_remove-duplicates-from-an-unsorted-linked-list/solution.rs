// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }

use std::collections::HashMap;

impl Solution {
    pub fn delete_duplicates_unsorted(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Two passes: count every value, then keep only the values whose
        // count is exactly one. A dummy node makes deleting the head a
        // non-case. Values are collected into a Vec first because an
        // owned singly-linked list cannot be walked twice.
        let mut values: Vec<i32> = Vec::new();
        let mut node = head.as_deref();
        while let Some(current) = node {
            values.push(current.val);
            node = current.next.as_deref();
        }
        let mut count: HashMap<i32, i32> = HashMap::new();
        for v in &values {
            *count.entry(*v).or_insert(0) += 1;
        }
        let kept: Vec<i32> = values.into_iter().filter(|v| count[v] == 1).collect();
        // Build the result list back-to-front so no tail pointer is needed.
        let mut next: Option<Box<ListNode>> = None;
        for v in kept.into_iter().rev() {
            next = Some(Box::new(ListNode { val: v, next }));
        }
        next
    }
}
