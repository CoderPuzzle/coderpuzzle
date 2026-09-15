use std::collections::BinaryHeap;

impl Solution {
    // Sweep indices left to right with the queries sorted by start; a
    // max-heap by right endpoint holds the queries covering the current
    // index. Whenever the running coverage of already selected queries
    // falls short of nums[i], select the query reaching farthest right
    // and retire its coverage one step past r via a difference array.
    // Return -1 when the heap runs dry on a deficit.
    pub fn max_removal(nums: Vec<i32>, mut queries: Vec<Vec<i32>>) -> i32 {
        queries.sort_by_key(|q| q[0]);
        let mut heap: BinaryHeap<usize> = BinaryHeap::new();
        let n = nums.len();
        let mut delta = vec![0i32; n + 1];
        let mut cover = 0i32;
        let mut selected = 0usize;
        let mut j = 0usize;
        for i in 0..n {
            cover += delta[i];
            while j < queries.len() && queries[j][0] <= i as i32 {
                heap.push(queries[j][1] as usize);
                j += 1;
            }
            while cover < nums[i] {
                while let Some(&r) = heap.peek() {
                    if r >= i {
                        break;
                    }
                    heap.pop();
                }
                let r = match heap.pop() {
                    Some(r) => r,
                    None => return -1,
                };
                cover += 1;
                delta[r + 1] -= 1;
                selected += 1;
            }
        }
        (queries.len() - selected) as i32
    }
}
