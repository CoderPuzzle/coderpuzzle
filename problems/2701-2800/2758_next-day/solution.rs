impl Solution {
    pub fn next_day(date: String) -> String {
        // The engine idea without an engine: the standard library ships no
        // calendar type, so the arithmetic is spelled out in day-number
        // space — a linear count of days in which month lengths and leap
        // years have been absorbed into the numbering. Converting in,
        // stepping by one, and converting back is the same renormalization
        // a date engine performs, and the format spec leaves only the
        // zero-padded rendering.
        fn days_from_civil(year: i64, month: u32, day: u32) -> i64 {
            let shifted_year = if month <= 2 { year - 1 } else { year };
            let era = if shifted_year >= 0 {
                shifted_year
            } else {
                shifted_year - 399
            } / 400;
            let year_of_era = shifted_year - era * 400;
            let month_index = ((month + 9) % 12) as i64;
            let day_of_year = (153 * month_index + 2) / 5 + day as i64 - 1;
            let day_of_era = year_of_era * 365 + year_of_era / 4 - year_of_era / 100 + day_of_year;
            era * 146097 + day_of_era - 719468
        }
        fn civil_from_days(days: i64) -> (i64, u32, u32) {
            let counted = days + 719468;
            let era = if counted >= 0 { counted } else { counted - 146096 } / 146097;
            let day_of_era = counted - era * 146097;
            let year_of_era = (day_of_era - day_of_era / 1460 + day_of_era / 36524 - day_of_era / 146096) / 365;
            let year = year_of_era + era * 400;
            let day_of_year = day_of_era - (365 * year_of_era + year_of_era / 4 - year_of_era / 100);
            let month_index = (5 * day_of_year + 2) / 153;
            let day = (day_of_year - (153 * month_index + 2) / 5 + 1) as u32;
            let month = (if month_index < 10 {
                month_index + 3
            } else {
                month_index - 9
            }) as u32;
            (if month <= 2 { year + 1 } else { year }, month, day)
        }
        let year: i64 = date[0..4].parse().unwrap();
        let month: u32 = date[5..7].parse().unwrap();
        let day: u32 = date[8..10].parse().unwrap();
        let next = civil_from_days(days_from_civil(year, month, day) + 1);
        format!("{:04}-{:02}-{:02}", next.0, next.1, next.2)
    }
}
