impl Solution {
    // Every attack opens a poison window of `duration` seconds, but a fresh
    // attack inside the still-open window resets the timer, so attack i
    // keeps only the part of its window that runs out before the next
    // attack: min(duration, gap). The final attack is never followed by
    // another, so it always contributes its full duration.
    //
    // The running total is the union of the windows so far, which never
    // exceeds t_max + duration <= 2*10^7 — well inside i32 range — but the
    // accumulation runs in i64 regardless: it costs nothing and keeps the
    // code independent of that bound argument.
    pub fn find_poisoned_duration(time_series: Vec<i32>, duration: i32) -> i32 {
        let mut total = 0i64;
        for i in 1..time_series.len() {
            total += duration.min(time_series[i] - time_series[i - 1]) as i64;
        }
        (total + duration as i64) as i32
    }
}
