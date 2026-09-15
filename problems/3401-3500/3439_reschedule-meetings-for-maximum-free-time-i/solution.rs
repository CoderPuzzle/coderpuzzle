impl Solution {
    // A meeting that stays put pins its position, so one continuous free
    // block can only stretch across gaps whose separating meetings are all
    // rescheduled — at most k of them, hence at most k + 1 consecutive gaps.
    // Compacting any k consecutive meetings against one edge of their span
    // realizes that window's gap sum as a single block.
    pub fn max_free_time(event_time: i32, k: i32, start_time: Vec<i32>, end_time: Vec<i32>) -> i32 {
        let n = start_time.len();
        let k = k as usize;
        let mut gaps = Vec::with_capacity(n + 1);
        gaps.push(start_time[0]);
        for i in 1..n {
            gaps.push(start_time[i] - end_time[i - 1]);
        }
        gaps.push(event_time - end_time[n - 1]);
        // Rolling sum of the k + 1 gaps around each group of k meetings.
        let mut window: i64 = gaps[..=k].iter().map(|&g| g as i64).sum();
        let mut best = window;
        for i in k + 1..=n {
            window += gaps[i] as i64 - gaps[i - k - 1] as i64;
            best = best.max(window);
        }
        best as i32
    }
}
