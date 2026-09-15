impl Solution {
    pub fn largest_even(s: String) -> String {
        // An even result must end in '2', and a longer number of these
        // digits always beats a shorter one, so the best keeps every
        // character up through the last '2' and sheds the odd tail.
        match s.rfind('2') {
            Some(i) => s[..=i].to_string(),
            None => String::new(),
        }
    }
}
