// Append-only timeline with running prefix totals: chronological calls
// keep `times` sorted, so a query binary-searches the window
// [startTime, endTime] and subtracts two prefix totals.
pub struct ExamTracker {
    times: Vec<i32>,
    // Held in i64: up to 10^5 scores of 10^9 push totals near 10^14,
    // far past 32-bit range.
    sums: Vec<i64>,
}

impl ExamTracker {
    pub fn new() -> Self {
        ExamTracker {
            times: Vec::new(),
            sums: Vec::new(),
        }
    }

    pub fn record(&mut self, time: i32, score: i32) {
        let previous = self.sums.last().copied().unwrap_or(0);
        self.times.push(time);
        self.sums.push(previous + score as i64);
    }

    pub fn totalScore(&mut self, startTime: i32, endTime: i32) -> i64 {
        let left = self.times.partition_point(|&t| t < startTime);
        let right = self.times.partition_point(|&t| t <= endTime);
        if left >= right {
            return 0;
        }
        let mut total = self.sums[right - 1];
        if left > 0 {
            total -= self.sums[left - 1];
        }
        total
    }
}
