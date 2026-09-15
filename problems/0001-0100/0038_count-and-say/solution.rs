impl Solution {
    pub fn count_and_say(n: i32) -> String {
        // The first term is fixed; each later term is the run-length encoding
        // of the one before it, so n - 1 encoding passes reach the nth term.
        let mut term = String::from("1");
        for _ in 1..n {
            let mut next = String::new();
            // Only digits 1-3 ever appear, so indexing bytes is indexing chars.
            let bytes = term.as_bytes();
            let mut index = 0;
            while index < bytes.len() {
                // Measure the maximal run starting at index: the group the
                // encoder must emit as <count><digit>, then skip past it.
                let mut run = 1;
                while index + run < bytes.len() && bytes[index + run] == bytes[index] {
                    run += 1;
                }
                next.push_str(&run.to_string());
                next.push(bytes[index] as char);
                index += run;
            }
            term = next;
        }
        term
    }
}
