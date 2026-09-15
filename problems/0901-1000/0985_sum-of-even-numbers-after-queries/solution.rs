// Every query rewrites exactly one element, so the even sum can only change
// through that element: carry it as a running total — subtract the old value
// when it is even, apply the addition, add the new value when it is even —
// and record the total once per query.
impl Solution {
    pub fn sum_even_after_queries(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let mut nums = nums;
        let mut running = nums.iter().filter(|value| *value % 2 == 0).sum::<i32>();
        let mut answer = Vec::with_capacity(queries.len());
        for query in &queries {
            let index = query[1] as usize;
            let old = nums[index];
            // the old value leaves the total before the addition lands, so a
            // value that flips parity is never counted on both sides
            if old % 2 == 0 {
                running -= old;
            }
            let updated = old + query[0];
            nums[index] = updated;
            // % 2 == 0 is the sign-safe evenness test: -2 passes it whatever
            // remainder -3 % 2 yields
            if updated % 2 == 0 {
                running += updated;
            }
            answer.push(running);
        }
        answer
    }
}
