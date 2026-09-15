impl Solution {
    pub fn shifting_letters(s: String, shifts: Vec<Vec<i32>>) -> String {
        let bytes = s.as_bytes();
        let n = bytes.len();
        // Shifts commute, so only the net shift per position matters.
        // Extra slot at n keeps every end+1 marker in bounds.
        let mut diff = vec![0i32; n + 1];
        for sh in &shifts {
            let delta = if sh[2] == 1 { 1 } else { -1 };
            // +delta at start, -delta just past end: an O(1) range update.
            diff[sh[0] as usize] += delta;
            diff[sh[1] as usize + 1] -= delta;
        }
        let mut out = String::with_capacity(n);
        let mut shift: i32 = 0;
        for i in 0..n {
            // Prefix sum yields the net shift; double % keeps it in [0, 26)
            // even when negative (backward shifts, wrap before 'a').
            shift += diff[i];
            let c = (bytes[i] - b'a') as i32;
            let r = (((c + shift) % 26) + 26) % 26;
            out.push((b'a' + r as u8) as char);
        }
        out
    }
}
