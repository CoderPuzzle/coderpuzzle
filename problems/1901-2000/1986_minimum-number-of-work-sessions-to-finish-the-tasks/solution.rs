impl Solution {
    pub fn min_sessions(tasks: Vec<i32>, sessionTime: i32) -> i32 {
        let n = tasks.len();
        let full = (1usize << n) - 1;
        const INF: i32 = i32::MAX;
        // dp[mask] = (sessions_used, remaining_time_in_open_session)
        let mut sessions = vec![INF; 1 << n];
        let mut remaining = vec![0i32; 1 << n];
        sessions[0] = 0;
        for mask in 0..(1usize << n) {
            if sessions[mask] == INF {
                continue;
            }
            for i in 0..n {
                let bit = 1usize << i;
                if mask & bit != 0 {
                    continue;
                }
                let cost = tasks[i];
                let (cand_s, cand_r) = if remaining[mask] >= cost {
                    (sessions[mask], remaining[mask] - cost)
                } else {
                    (sessions[mask] + 1, sessionTime - cost)
                };
                let next = mask | bit;
                // fewer sessions wins; tie -> more remaining time wins
                if cand_s < sessions[next] || (cand_s == sessions[next] && cand_r > remaining[next]) {
                    sessions[next] = cand_s;
                    remaining[next] = cand_r;
                }
            }
        }
        sessions[full]
    }
}
