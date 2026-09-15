impl Solution {
    pub fn clear_stars(s: String) -> String {
        // Each '*' removes the newest surviving copy of the smallest letter
        // seen so far; deleting anything larger, or an older copy of that
        // letter, can only leave a bigger remainder behind.
        let bytes = s.as_bytes();
        let mut slots: Vec<Vec<usize>> = vec![Vec::new(); 26];
        let mut dropped = vec![false; bytes.len()];
        for i in 0..bytes.len() {
            if bytes[i] == b'*' {
                dropped[i] = true;
                for slot in slots.iter_mut() {
                    if let Some(pos) = slot.pop() {
                        dropped[pos] = true;
                        break;
                    }
                }
            } else {
                slots[(bytes[i] - b'a') as usize].push(i);
            }
        }
        let kept: Vec<u8> = (0..bytes.len()).filter(|&i| !dropped[i]).map(|i| bytes[i]).collect();
        String::from_utf8(kept).unwrap()
    }
}
