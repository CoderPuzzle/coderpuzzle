impl Solution {
    pub fn next_day(date: String) -> String {
        // Hand-rolled: parse the three fields, step the day-of-month, and
        // roll over through a days-in-month table — February widened to 29
        // on leap years (divisible by 4, except centuries unless divisible
        // by 400), December's overflow carrying into the next year. The
        // format spec zero-pads month and day to two digits and the year to
        // four, so the result is exactly "YYYY-MM-DD".
        let year: i32 = date[0..4].parse().unwrap();
        let month: usize = date[5..7].parse().unwrap();
        let day: i32 = date[8..10].parse().unwrap();
        let is_leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
        let mut month_lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if is_leap {
            month_lengths[1] = 29;
        }
        let (mut next_year, mut next_month, mut next_day) = (year, month, day + 1);
        if next_day > month_lengths[next_month - 1] {
            next_day = 1;
            next_month += 1;
            if next_month > 12 {
                next_month = 1;
                next_year += 1;
            }
        }
        format!("{:04}-{:02}-{:02}", next_year, next_month, next_day)
    }
}
