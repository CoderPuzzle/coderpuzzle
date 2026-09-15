impl Solution {
    pub fn restore_ip_addresses(s: String) -> Vec<String> {
        let mut addresses = Vec::new();
        let mut segments: Vec<&str> = Vec::with_capacity(4);
        cut(&s, 0, &mut segments, &mut addresses);
        addresses
    }
}

// Shorter cuts are visited first, and a dot sorts before any digit, so the
// output lands in ascending lexicographic order.
fn cut<'a>(s: &'a str, start: usize, segments: &mut Vec<&'a str>, addresses: &mut Vec<String>) {
    let remaining = 4 - segments.len();
    // What is left must feed 1-3 digits to every remaining segment; at zero
    // segments left this accepts only a fully consumed string.
    if !(remaining <= s.len() - start && s.len() - start <= 3 * remaining) {
        return;
    }
    if remaining == 0 {
        addresses.push(segments.join("."));
        return;
    }
    for length in 1..=3 {
        if start + length > s.len() {
            break;
        }
        let part = &s[start..start + length];
        // A segment is 0-255 with no leading zero unless it is exactly "0".
        if part.len() > 1 && part.starts_with('0') {
            continue;
        }
        if part.parse::<u32>().unwrap() > 255 {
            continue;
        }
        segments.push(part);
        cut(s, start + length, segments, addresses);
        segments.pop();
    }
}
