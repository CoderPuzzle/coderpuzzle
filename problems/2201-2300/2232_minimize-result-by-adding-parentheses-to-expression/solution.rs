impl Solution {
    pub fn minimize_result(expression: String) -> String {
        let plus = expression.find('+').expect("exactly one '+'");
        let (left, right) = (&expression[..plus], &expression[plus + 1..]);
        let mut best_value: Option<i64> = None;
        let mut best_form = String::new();
        for i in 0..left.len() {
            for j in 1..=right.len() {
                let outer_left: i64 = if i > 0 { left[..i].parse().unwrap() } else { 1 };
                let outer_right: i64 = if j < right.len() {
                    right[j..].parse().unwrap()
                } else {
                    1
                };
                let inner: i64 = left[i..].parse::<i64>().unwrap() + right[..j].parse::<i64>().unwrap();
                let value = outer_left * inner * outer_right;
                if best_value.is_none() || value < best_value.unwrap() {
                    best_value = Some(value);
                    best_form = format!("{}({}+{}){}", &left[..i], &left[i..], &right[..j], &right[j..]);
                }
            }
        }
        best_form
    }
}
