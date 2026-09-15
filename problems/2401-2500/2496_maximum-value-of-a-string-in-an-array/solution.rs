impl Solution {
    pub fn maximum_value(strs: Vec<String>) -> i32 {
        // Digits-only strings count as their base-10 numeric value
        // (parse::<i32> handles leading zeros); everything else counts by
        // length. The parse fails exactly on the lettered strings, since
        // the alphabet never carries a sign character, and nine digits
        // stay inside i32's range.
        let mut best = 0;
        for s in &strs {
            let value = match s.parse::<i32>() {
                Ok(v) => v,
                Err(_) => s.len() as i32,
            };
            best = best.max(value);
        }
        best
    }
}
