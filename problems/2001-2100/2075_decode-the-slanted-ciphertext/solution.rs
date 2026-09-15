impl Solution {
    pub fn decode_ciphertext(encodedText: String, rows: i32) -> String {
        if encodedText.is_empty() {
            return String::new();
        }
        let rows = rows as usize;
        let cols = encodedText.len() / rows;
        let bytes = encodedText.as_bytes();
        let mut decoded = Vec::with_capacity(encodedText.len());
        for start in 0..cols {
            let mut row = 0;
            let mut col = start;
            while row < rows && col < cols {
                decoded.push(bytes[row * cols + col]);
                row += 1;
                col += 1;
            }
        }
        while decoded.last() == Some(&b' ') {
            decoded.pop();
        }
        String::from_utf8(decoded).unwrap()
    }
}
