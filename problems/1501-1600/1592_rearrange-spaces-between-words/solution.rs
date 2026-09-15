impl Solution {
    pub fn reorder_spaces(text: String) -> String {
        let words: Vec<&str> = text.split_whitespace().collect();
        let spaces = text.chars().filter(|&c| c == ' ').count();

        if words.len() == 1 {
            // A single word: every space is trailing.
            return format!("{}{}", words[0], " ".repeat(spaces));
        }

        // Distribute spaces as evenly as possible between the gaps, and
        // push whatever does not divide evenly to the end.
        let gaps = words.len() - 1;
        let between = spaces / gaps;
        let extra = spaces % gaps;

        format!("{}{}", words.join(&" ".repeat(between)), " ".repeat(extra))
    }
}
