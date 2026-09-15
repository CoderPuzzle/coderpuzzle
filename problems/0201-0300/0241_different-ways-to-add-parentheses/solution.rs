impl Solution {
    pub fn diff_ways_to_compute(expression: String) -> Vec<i64> {
        let s = expression.as_str();
        let mut results = Self::values(s, 0, s.len());
        // The recursion emits each root operator's cross products in string
        // order; one ascending sort turns that into the pinned order, and
        // nothing dedupes, so equal values from different groupings survive.
        results.sort();
        results
    }

    // Every operator takes its turn as the root of the expression tree, so
    // each split contributes the cross product of the values its two sides
    // can produce; a range without an operator is a single operand whose
    // only grouping is the number itself. Operands are plain ASCII, so byte
    // offsets slice the string safely.
    fn values(s: &str, lo: usize, hi: usize) -> Vec<i64> {
        let mut results = Vec::new();
        let mut split = false;
        for i in lo..hi {
            let op = s.as_bytes()[i];
            if op != b'+' && op != b'-' && op != b'*' {
                continue;
            }
            split = true;
            for left in Self::values(s, lo, i) {
                for right in Self::values(s, i + 1, hi) {
                    let combined = match op {
                        b'+' => left + right,
                        b'-' => left - right,
                        _ => left * right,
                    };
                    results.push(combined);
                }
            }
        }
        if !split {
            results.push(s[lo..hi].parse::<i64>().unwrap());
        }
        results
    }
}
