impl Solution {
    pub fn partition_labels(s: String) -> Vec<i32> {
        let bytes = s.as_bytes();
        // A part must extend to the last occurrence of every letter it
        // contains, so record where each letter finally appears.
        let mut last = [-1i32; 26];
        for (i, &b) in bytes.iter().enumerate() {
            last[(b - b'a') as usize] = i as i32;
        }
        let mut parts = Vec::new();
        let (mut start, mut end) = (0i32, 0i32);
        for (i, &b) in bytes.iter().enumerate() {
            // end = farthest last occurrence among letters opened so far.
            let l = last[(b - b'a') as usize];
            if l > end {
                end = l;
            }
            // i == end: every letter opened in this span also closes in
            // it, so a cut here is legal.
            if i as i32 == end {
                parts.push(end - start + 1);
                start = i as i32 + 1;
            }
        }
        parts
    }
}
