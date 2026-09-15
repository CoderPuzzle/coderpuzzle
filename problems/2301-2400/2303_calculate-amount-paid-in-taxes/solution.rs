impl Solution {
    pub fn calculate_tax(brackets: Vec<Vec<i32>>, income: i32) -> f64 {
        // Walk the brackets in order; each is taxed on the slice of income
        // between the previous upper bound and min(income, upper).
        let mut paid: i64 = 0;
        let mut prev: i64 = 0;
        let mut income = i64::from(income);
        for bracket in &brackets {
            let upper = i64::from(bracket[0]);
            let percent = i64::from(bracket[1]);
            if income <= upper {
                paid += (income - prev) * percent;
                break;
            }
            paid += (upper - prev) * percent;
            prev = upper;
        }
        // The product sum reaches 1e5 in the i64; dividing once yields the
        // correctly rounded double of the rational total.
        paid as f64 / 100.0
    }
}
