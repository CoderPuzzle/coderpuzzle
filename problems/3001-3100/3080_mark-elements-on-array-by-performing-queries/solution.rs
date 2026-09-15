impl Solution {
    pub fn unmarked_sum_array(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i64> {
        // Marking only ever removes elements, so one monotone sweep over the
        // indices sorted by (value, index) answers every query's "k smallest
        // unmarked" step: the pointer skips entries marked by name and never
        // revisits one. A running total absorbs each mark — it can reach
        // 10^5 * 10^5 = 10^10, beyond i32, so the total is an i64.
        let n = nums.len();
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by_key(|&i| (nums[i], i));
        let mut marked = vec![false; n];
        let mut total: i64 = nums.iter().map(|&v| v as i64).sum();
        let mut pointer = 0;
        let mut answer = Vec::with_capacity(queries.len());
        for query in &queries {
            let index = query[0] as usize;
            let count = query[1];
            if !marked[index] {
                marked[index] = true;
                total -= nums[index] as i64;
            }
            let mut taken = 0;
            while taken < count && pointer < n {
                let candidate = order[pointer];
                pointer += 1;
                if marked[candidate] {
                    continue;
                }
                marked[candidate] = true;
                total -= nums[candidate] as i64;
                taken += 1;
            }
            answer.push(total);
        }
        answer
    }
}
