impl Solution {
    pub fn discount_prices(sentence: String, discount: i32) -> String {
        // A word is a price exactly when '$' leads a run of digits only.
        // Whole-dollar prices make price * (100 - discount) the discounted value
        // in exact cents, so integer arithmetic renders the two decimals without
        // ever touching binary floats.
        let factor = (100 - discount) as i64;
        let mut words = Vec::new();
        for word in sentence.split(' ') {
            let digits = &word[1..];
            let price = word.len() > 1 && word.starts_with('$') && digits.bytes().all(|byte| byte.is_ascii_digit());
            if price {
                let cents = digits.parse::<i64>().unwrap() * factor;
                words.push(format!("${}.{:02}", cents / 100, cents % 100));
            } else {
                words.push(word.to_string());
            }
        }
        words.join(" ")
    }
}
