impl Solution {
    pub fn num_of_minutes(n: i32, head_id: i32, manager: Vec<i32>, inform_time: Vec<i32>) -> i32 {
        // arrival[i] = minutes until employee i starts spreading the news.
        let n = n as usize;
        let head_id = head_id as usize;
        let mut arrival = vec![-1i64; n];
        arrival[head_id] = 0;
        let mut best = 0i64;
        for employee in 0..n {
            if arrival[employee] >= 0 {
                best = best.max(arrival[employee]);
                continue;
            }
            // Walk up the chain of unresolved managers, then unwind downward.
            let mut chain: Vec<usize> = Vec::new();
            let mut current = employee;
            while arrival[current] < 0 {
                chain.push(current);
                current = manager[current] as usize;
            }
            for k in (0..chain.len()).rev() {
                let boss = manager[chain[k]] as usize;
                arrival[chain[k]] = arrival[boss] + inform_time[boss] as i64;
            }
            best = best.max(arrival[employee]);
        }
        best as i32
    }
}
