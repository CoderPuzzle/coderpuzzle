impl Solution {
    pub fn split_message(message: String, limit: i32) -> Vec<String> {
        // digit_len[i] = total decimal digit count of integers 1..i, so
        // each candidate part count b costs O(1) instead of O(b).
        let n = message.len();
        let limit = limit as usize;
        let mut digit_len = vec![0usize; n + 1];
        for x in 1..=n {
            digit_len[x] = digit_len[x - 1] + x.to_string().len();
        }
        for b in 1..=n {
            let digits_b = b.to_string().len();
            if 2 * digits_b + 3 > limit {
                break; // the widest suffix "<b/b>" won't fit
            }
            // Capacity: sum over a=1..b of (limit - len(str(a)) - digits_b - 3).
            let capacity = b * limit - digit_len[b] - b * digits_b - 3 * b;
            if capacity < n {
                continue;
            }
            let mut parts = Vec::with_capacity(b);
            let mut pos = 0;
            for a in 1..=b {
                let suffix = format!("<{a}/{b}>");
                let take = (limit - suffix.len()).min(n - pos);
                parts.push(format!("{}{}", &message[pos..pos + take], suffix));
                pos += take;
            }
            return parts;
        }
        Vec::new()
    }
}
