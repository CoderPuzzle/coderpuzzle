impl Solution {
    pub fn add_spaces(s: String, spaces: Vec<i32>) -> String {
        let mut result = String::with_capacity(s.len() + spaces.len());
        let mut space_index = 0;
        for (index, character) in s.bytes().enumerate() {
            if space_index < spaces.len() && spaces[space_index] as usize == index {
                result.push(' ');
                space_index += 1;
            }
            result.push(character as char);
        }
        result
    }
}
