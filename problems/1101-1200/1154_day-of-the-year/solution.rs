impl Solution {
    pub fn day_of_year(date: String) -> i32 {
        let year: i32 = date[0..4].parse().unwrap();
        let month: usize = date[5..7].parse().unwrap();
        let day: i32 = date[8..10].parse().unwrap();
        let mut days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // Gregorian leap rule: div by 4, except centuries, except 400.
        let leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
        if leap {
            days[1] = 29;
        }
        day + days[..month - 1].iter().sum::<i32>()
    }
}
