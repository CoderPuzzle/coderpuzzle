impl Solution {
    pub fn reorder_log_files(logs: Vec<String>) -> Vec<String> {
        // Each letter entry carries (content, identifier, original log);
        // digit logs are set aside untouched.
        let mut letter: Vec<(&str, &str, &str)> = Vec::new();
        let mut digit: Vec<&str> = Vec::new();
        for log in &logs {
            let space = log.find(' ').unwrap();
            let ident = &log[..space];
            let content = &log[space + 1..];
            // The content's first character classifies the log: a digit
            // makes it a digit-log, which the sort never touches.
            if content.as_bytes()[0].is_ascii_digit() {
                digit.push(log.as_str());
            } else {
                letter.push((content, ident, log.as_str()));
            }
        }
        // Letter-logs order by (content, identifier) — a total order, since
        // equal keys mean identical logs — then every digit-log follows in
        // its input position.
        letter.sort_by(|a, b| (a.0, a.1).cmp(&(b.0, b.1)));
        letter
            .into_iter()
            .map(|(_, _, log)| log.to_string())
            .chain(digit.into_iter().map(|log| log.to_string()))
            .collect()
    }
}
