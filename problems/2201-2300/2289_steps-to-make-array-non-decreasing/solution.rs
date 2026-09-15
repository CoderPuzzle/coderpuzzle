impl Solution {
    pub fn total_steps(nums: Vec<i32>) -> i32 {
        // Stack of pairs (value, step).
        let mut st_val: Vec<i64> = Vec::new();
        let mut st_step: Vec<i64> = Vec::new();
        let mut ans: i64 = 0;
        for &x in &nums {
            let mut cur: i64 = 0;
            while let Some(&top) = st_val.last() {
                if top <= x as i64 {
                    st_val.pop();
                    let popped = st_step.pop().unwrap();
                    if popped > cur {
                        cur = popped;
                    }
                } else {
                    break;
                }
            }
            if !st_val.is_empty() {
                cur += 1;
            } else {
                cur = 0;
            }
            st_val.push(x as i64);
            st_step.push(cur);
            if cur > ans {
                ans = cur;
            }
        }
        ans as i32
    }
}
