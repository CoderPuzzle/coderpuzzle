impl Solution {
    pub fn push_dominoes(dominoes: String) -> String {
        let d = dominoes.as_bytes();
        let n = d.len() as i64;
        // Skip simulation: accumulate signed force. Left to right, an
        // R plants a sentinel force n and an L kills it; the force
        // decays one per step and never drops below zero.
        let mut forces = vec![0i64; d.len()];
        let mut f: i64 = 0;
        for i in 0..d.len() {
            if d[i] == b'R' {
                f = n;
            } else if d[i] == b'L' {
                f = 0;
            } else {
                f = (f - 1).max(0);
            }
            forces[i] += f;
        }
        // Mirror pass: L plants the force and R blocks it; subtracting
        // leaves the difference between the opposing pushes.
        f = 0;
        for i in (0..d.len()).rev() {
            if d[i] == b'L' {
                f = n;
            } else if d[i] == b'R' {
                f = 0;
            } else {
                f = (f - 1).max(0);
            }
            forces[i] -= f;
        }
        // Sign decides: positive falls right, negative left, and zero
        // means the pushes balance — or nothing reached it.
        let res: Vec<u8> = forces
            .iter()
            .map(|&x| {
                if x == 0 {
                    b'.'
                } else if x > 0 {
                    b'R'
                } else {
                    b'L'
                }
            })
            .collect();
        String::from_utf8(res).unwrap()
    }
}
