use std::collections::HashMap;

impl Solution {
    pub fn reformat_date(date: String) -> String {
        // Split on spaces to get the day (with its ordinal suffix), the
        // three-letter month, and the four-digit year.
        let parts: Vec<&str> = date.split(' ').collect();
        let (day_part, month_part, year) = (parts[0], parts[1], parts[2]);

        let months = HashMap::from([
            ("Jan", "01"),
            ("Feb", "02"),
            ("Mar", "03"),
            ("Apr", "04"),
            ("May", "05"),
            ("Jun", "06"),
            ("Jul", "07"),
            ("Aug", "08"),
            ("Sep", "09"),
            ("Oct", "10"),
            ("Nov", "11"),
            ("Dec", "12"),
        ]);

        // Every ordinal suffix (st/nd/rd/th) is exactly two letters, so
        // dropping the last two characters always leaves the bare digits.
        let digits = &day_part[..day_part.len() - 2];
        let day = if digits.len() == 1 {
            format!("0{}", digits)
        } else {
            digits.to_string()
        };

        format!("{}-{}-{}", year, months[month_part], day)
    }
}
