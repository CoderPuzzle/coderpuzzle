impl Solution {
    pub fn second_greater_element(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut result = vec![-1; n];
        let mut first: Vec<usize> = Vec::with_capacity(n); // awaiting first greater
        let mut second: Vec<usize> = Vec::with_capacity(n); // awaiting second greater
        for i in 0..n {
            let x = nums[i];
            while let Some(&top) = second.last() {
                if nums[top] < x {
                    result[top] = x;
                    second.pop();
                } else {
                    break;
                }
            }
            let mut batch: Vec<usize> = Vec::new();
            while let Some(&top) = first.last() {
                if nums[top] < x {
                    batch.push(top);
                    first.pop();
                } else {
                    break;
                }
            }
            // batch leaves the first stack in increasing value order; push it
            // back-to-front so the second stack keeps its smallest value on top
            while let Some(j) = batch.pop() {
                second.push(j);
            }
            first.push(i);
        }
        result
    }
}
