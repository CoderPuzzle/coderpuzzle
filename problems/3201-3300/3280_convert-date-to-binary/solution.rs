impl Solution {
    pub fn convert_date_to_binary(date: String) -> String {
        // The calendar pads month and day to two digits, but the binary form
        // drops that padding: each dash-separated component is parsed as its
        // plain decimal value and rendered in base 2 with no leading zeroes,
        // then the pieces are rejoined with dashes in year-month-day order.
        // {:b} formatting already omits leading zeroes.
        date.split('-')
            .map(|part| format!("{:b}", part.parse::<i32>().unwrap()))
            .collect::<Vec<_>>()
            .join("-")
    }
}
