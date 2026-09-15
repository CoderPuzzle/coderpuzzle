impl Solution {
    pub fn number_of_days(year: i32, month: i32) -> i32 {
        if month == 2 {
            // Gregorian leap rule: div by 4, except centuries, except 400s.
            let leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
            if leap {
                29
            } else {
                28
            }
        } else if matches!(month, 4 | 6 | 9 | 11) {
            30
        } else {
            31
        }
    }
}
