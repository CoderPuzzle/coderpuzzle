impl Solution {
    pub fn int_to_roman(num: i32) -> String {
        // Folding the six subtractive forms into the value table and sorting
        // it descending makes plain greed exact: the largest value that fits
        // is always the symbol the decimal-place rules would pick.
        let table = [
            (1000, "M"),
            (900, "CM"),
            (500, "D"),
            (400, "CD"),
            (100, "C"),
            (90, "XC"),
            (50, "L"),
            (40, "XL"),
            (10, "X"),
            (9, "IX"),
            (5, "V"),
            (4, "IV"),
            (1, "I"),
        ];
        let mut num = num;
        let mut result = String::new();
        // Each value is consumed at most three times, so the walk is bounded
        // by the table, not by num.
        for (value, symbol) in table {
            while num >= value {
                result.push_str(symbol);
                num -= value;
            }
        }
        result
    }
}
