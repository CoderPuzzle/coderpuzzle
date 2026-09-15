impl Solution {
    fn is_leap(y: i32) -> bool {
        y % 4 == 0 && (y % 100 != 0 || y % 400 == 0)
    }

    pub fn day_of_the_week(day: i32, month: i32, year: i32) -> String {
        // Anchored: Jan 1 1971 was a Friday, so offset 0 maps to Friday.
        const NAMES: [&str; 7] = [
            "Friday",
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
        ];
        const MONTH_DAYS: [i32; 12] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        let mut days: i64 = 0;
        for y in 1971..year {
            days += if Self::is_leap(y) { 366 } else { 365 };
        }
        for m in 1..month {
            days += MONTH_DAYS[(m - 1) as usize] as i64;
            if m == 2 && Self::is_leap(year) {
                days += 1;
            }
        }
        days += (day - 1) as i64;
        NAMES[(days % 7) as usize].to_string()
    }
}
