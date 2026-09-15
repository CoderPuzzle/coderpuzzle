impl Solution {
    pub fn most_booked(n: i32, meetings: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut ordered: Vec<(i32, i32, usize)> = meetings.iter().enumerate().map(|(i, m)| (m[0], m[1], i)).collect();
        ordered.sort_by(|a, b| a.0.cmp(&b.0).then(a.2.cmp(&b.2)));
        // end_time[i] = when room i frees up (-1: never used, always free).
        let mut end_time: Vec<i64> = vec![-1; n];
        let mut count = vec![0i32; n];
        for &(s, e, _) in &ordered {
            // Lowest-numbered room already free by s wins the allocation.
            let mut room: i64 = -1;
            for i in 0..n {
                if end_time[i] <= s as i64 {
                    room = i as i64;
                    break;
                }
            }
            if room == -1 {
                // All busy: take the earliest-finishing room (strict <
                // keeps the lowest index on ties) and delay the meeting
                // there with its original duration.
                room = 0;
                for i in 1..n {
                    if end_time[i] < end_time[room as usize] {
                        room = i as i64;
                    }
                }
                end_time[room as usize] += (e - s) as i64;
            } else {
                end_time[room as usize] = e as i64;
            }
            count[room as usize] += 1;
        }
        // Strict comparison keeps the lowest room index on count ties.
        let mut best: usize = 0;
        for i in 1..n {
            if count[i] > count[best] {
                best = i;
            }
        }
        best as i32
    }
}
