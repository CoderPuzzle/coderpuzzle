use std::collections::BinaryHeap;

impl Solution {
    pub fn convert_array(nums: Vec<i32>) -> i32 {
        fn non_decreasing_cost(values: &[i32]) -> i64 {
            let mut heap: BinaryHeap<i32> = BinaryHeap::new();
            let mut cost: i64 = 0;
            for &v in values {
                heap.push(v);
                if let Some(&top) = heap.peek() {
                    if top > v {
                        cost += (top - v) as i64;
                        heap.pop();
                        heap.push(v);
                    }
                }
            }
            cost
        }

        let negated: Vec<i32> = nums.iter().map(|&v| -v).collect();
        let up = non_decreasing_cost(&nums);
        let down = non_decreasing_cost(&negated);
        up.min(down) as i32
    }
}
