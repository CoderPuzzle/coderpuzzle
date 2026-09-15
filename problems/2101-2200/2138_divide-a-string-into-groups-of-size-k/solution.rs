impl Solution {
    pub fn divide_string(s: String, k: i32, fill: String) -> Vec<String> {
        let size = k as usize;
        let mut padded = s.into_bytes();
        let padding = (size - padded.len() % size) % size;
        padded.extend(std::iter::repeat(fill.as_bytes()[0]).take(padding));
        padded
            .chunks(size)
            .map(|group| String::from_utf8(group.to_vec()).unwrap())
            .collect()
    }
}
