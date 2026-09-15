impl Solution {
    pub fn count_days_together(arriveAlice: String, leaveAlice: String, arriveBob: String, leaveBob: String) -> i32 {
        // Month lengths of a non-leap year, turned into "days before month
        // m" so any "MM-DD" maps to one day-of-year integer.
        let month_start: [i32; 12] = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        let day_of_year = |date: &str| -> i32 {
            let month = date[0..2].parse::<i32>().unwrap();
            let day = date[3..5].parse::<i32>().unwrap();
            month_start[(month - 1) as usize] + day
        };

        // Both stays are now integer intervals; the shared days are their
        // inclusive intersection, empty exactly when the bounds cross.
        let arrival = day_of_year(&arriveAlice).max(day_of_year(&arriveBob));
        let departure = day_of_year(&leaveAlice).min(day_of_year(&leaveBob));
        (departure - arrival + 1).max(0)
    }
}
