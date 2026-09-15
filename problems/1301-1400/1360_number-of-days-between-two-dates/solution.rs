impl Solution {
    pub fn days_between_dates(date1: String, date2: String) -> i32 {
        // Day numbers from a fixed epoch; the answer is their difference.
        (Self::day_number(&date1) - Self::day_number(&date2)).abs()
    }

    fn day_number(date: &str) -> i32 {
        let bytes = date.as_bytes();
        let year = Self::parse(&bytes[0..4]);
        let month = Self::parse(&bytes[5..7]);
        let day = Self::parse(&bytes[8..10]);
        const MONTH_LENGTHS: [i32; 12] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let mut total = 0;
        for y in 1971..year {
            total += if Self::is_leap(y) { 366 } else { 365 };
        }
        for m in 1..month {
            total += MONTH_LENGTHS[(m - 1) as usize];
            if m == 2 && Self::is_leap(year) {
                total += 1;
            }
        }
        total + day - 1
    }

    fn is_leap(year: i32) -> bool {
        year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
    }

    fn parse(digits: &[u8]) -> i32 {
        let mut value = 0;
        for &d in digits {
            value = value * 10 + (d - b'0') as i32;
        }
        value
    }
}
