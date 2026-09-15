impl Solution {
    pub fn mask_pii(s: String) -> String {
        // The '@' sign only appears in emails, so finding it settles
        // which of the two shapes the input is. An email answer keeps
        // the name's first and last letters and everything from the '@'
        // on, folds uppercase to lowercase by adding 32, and pins the
        // name's middle to five asterisks; the name is at least two
        // letters, so even "ab" wears the full five. A phone answer
        // needs only the digits: ten of them form the bare local number,
        // and each digit beyond ten contributes one masked asterisk
        // behind a '+', ahead of the shared "***-***-" tail and the
        // last four digits.
        let s = s.as_bytes();
        let mut out = Vec::with_capacity(s.len() + 6);
        if let Some(at) = s.iter().position(|&c| c == b'@') {
            for (i, &c) in s.iter().enumerate() {
                // Position 1 opens the fixed five-asterisk middle; the
                // name's first and last letters and the whole domain
                // are the only characters kept.
                if i == 1 {
                    out.extend_from_slice(b"*****");
                }
                if i == 0 || i + 1 >= at {
                    let folded = if c >= b'A' && c <= b'Z' { c + 32 } else { c };
                    out.push(folded);
                }
            }
        } else {
            let digits: Vec<u8> = s.iter().copied().filter(|&c| c >= b'0' && c <= b'9').collect();
            // Every digit past ten is one masked country-code star.
            if digits.len() > 10 {
                out.push(b'+');
                for _ in 10..digits.len() {
                    out.push(b'*');
                }
                out.push(b'-');
            }
            out.extend_from_slice(b"***-***-");
            out.extend_from_slice(&digits[digits.len() - 4..]);
        }
        String::from_utf8(out).unwrap()
    }
}
