impl Solution {
    pub fn decode_at_index(s: String, k: i32) -> String {
        // Forward pass computes the decoded length of each prefix, saturated at
        // a huge cap (far above k) since the true length can exceed 64 bits.
        // Backward pass reduces k through each repetition/letter.
        let bytes = s.as_bytes();
        let n = bytes.len();
        const CAP: i64 = 1 << 62;
        let mut lengths = vec![0i64; n];
        let mut cur: i64 = 0;
        for i in 0..n {
            let ch = bytes[i];
            if (b'2'..=b'9').contains(&ch) {
                let d = (ch - b'0') as i64;
                cur = if cur > CAP / d { CAP } else { cur * d };
            } else {
                cur = if cur < CAP { cur + 1 } else { CAP };
            }
            lengths[i] = cur;
        }
        let mut kk = k as i64;
        for i in (0..n).rev() {
            let ch = bytes[i];
            if (b'2'..=b'9').contains(&ch) {
                let prev = lengths[i - 1];
                kk = (kk - 1) % prev + 1;
            } else {
                if kk == lengths[i] {
                    return (ch as char).to_string();
                }
            }
        }
        (bytes[0] as char).to_string()
    }
}
