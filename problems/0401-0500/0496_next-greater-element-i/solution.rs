use std::collections::HashMap;

impl Solution {
    pub fn next_greater_element(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
        // One scan of nums2 answers every query: the stack holds values
        // still waiting for their next greater element.
        let mut next_greater: HashMap<i32, i32> = HashMap::new();
        let mut stack: Vec<i32> = Vec::new();
        for &value in &nums2 {
            // The current value is the FIRST greater value to the right of
            // each popped element (anything closer would have popped them
            // already); each element is pushed once, popped at most once.
            while let Some(&top) = stack.last() {
                if top < value {
                    next_greater.insert(top, value);
                    stack.pop();
                } else {
                    break;
                }
            }
            stack.push(value);
        }
        // Whatever survives on the stack has nothing greater to its right.
        for &value in &stack {
            next_greater.insert(value, -1);
        }
        // Values are unique and nums1 is a subset of nums2, so every
        // lookup hits.
        nums1.iter().map(|&v| next_greater[&v]).collect()
    }
}
