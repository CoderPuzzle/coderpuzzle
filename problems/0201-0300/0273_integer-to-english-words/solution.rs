impl Solution {
    pub fn number_to_words(num: i32) -> String {
        // One group below 1000: the hundreds digit's word plus "Hundred",
        // then the remainder under 100 — taken wholesale through the teens,
        // tens word plus ones digit otherwise.
        fn under_thousand(mut value: i32) -> Vec<&'static str> {
            const ONES: [&str; 10] = [
                "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
            ];
            const TEENS: [&str; 10] = [
                "Ten",
                "Eleven",
                "Twelve",
                "Thirteen",
                "Fourteen",
                "Fifteen",
                "Sixteen",
                "Seventeen",
                "Eighteen",
                "Nineteen",
            ];
            const TENS: [&str; 10] = [
                "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
            ];
            let mut group: Vec<&str> = Vec::new();
            if value >= 100 {
                group.push(ONES[(value / 100) as usize]);
                group.push("Hundred");
                value %= 100;
            }
            if value >= 20 {
                group.push(TENS[(value / 10) as usize]);
                value %= 10;
            } else if value >= 10 {
                group.push(TEENS[(value - 10) as usize]);
                value = 0;
            }
            if value > 0 {
                group.push(ONES[value as usize]);
            }
            group
        }

        // Walk the scales high to low: each non-empty group spells itself and
        // appends its scale word, so an all-zero middle group (1000010's
        // thousands) contributes nothing at all.
        let mut rest = num;
        let mut pieces: Vec<&str> = Vec::new();
        for (scale, name) in [(1000000000, "Billion"), (1000000, "Million"), (1000, "Thousand")] {
            if rest >= scale {
                pieces.extend(under_thousand(rest / scale));
                pieces.push(name);
                rest %= scale;
            }
        }
        if rest > 0 {
            pieces.extend(under_thousand(rest));
        }
        // Zero is the only input that leaves no piece — it spells itself.
        if pieces.is_empty() {
            "Zero".to_string()
        } else {
            pieces.join(" ")
        }
    }
}
