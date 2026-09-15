impl Solution {
    pub fn full_justify(words: Vec<String>, maxWidth: i32) -> Vec<String> {
        let max_width = maxWidth as usize;
        // Greedy packing: the current line keeps accepting words while its
        // letters plus one joining space per gap still fit in maxWidth; the
        // first word that would overflow opens a new line.
        let mut lines: Vec<Vec<&str>> = Vec::new();
        let mut current: Vec<&str> = Vec::new();
        let mut letters = 0;
        for word in &words {
            if !current.is_empty() && letters + word.len() + current.len() > max_width {
                lines.push(std::mem::take(&mut current));
                letters = 0;
            }
            current.push(word.as_str());
            letters += word.len();
        }
        lines.push(current);

        let last = lines.len() - 1;
        lines
            .iter()
            .enumerate()
            .map(|(index, line)| render(line, index == last, max_width))
            .collect()
    }
}

// The last line, and any line holding a single word, is left-justified:
// single spaces between words, padding all on the tail.
fn render(line: &[&str], is_last: bool, max_width: usize) -> String {
    if is_last || line.len() == 1 {
        let mut text = line.join(" ");
        while text.len() < max_width {
            text.push(' ');
        }
        return text;
    }
    let letters: usize = line.iter().map(|word| word.len()).sum();
    let gaps = line.len() - 1;
    let (base, extra) = ((max_width - letters) / gaps, (max_width - letters) % gaps);
    let mut text = String::new();
    for (gap, word) in line[..gaps].iter().enumerate() {
        text.push_str(word);
        // Every gap gets `base` spaces and the leftmost `extra` gaps one
        // more, so left slots are never narrower than right ones.
        for _ in 0..base + usize::from(gap < extra) {
            text.push(' ');
        }
    }
    text.push_str(line[gaps]);
    text
}
