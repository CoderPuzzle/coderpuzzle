impl Solution {
    pub fn maximum_gain(s: String, x: i32, y: i32) -> i32 {
        fn remove_pairs(text: &[u8], first: u8, second: u8, points: i32) -> (Vec<u8>, i32) {
            // Stack scan: `second` arriving on a top of `first` pops and
            // scores; everything else is pushed. Survivors are the text with
            // every non-overlapping removal of this pattern applied.
            let mut stack: Vec<u8> = Vec::with_capacity(text.len());
            let mut score = 0;
            for &c in text {
                if let Some(&top) = stack.last() {
                    if top == first && c == second {
                        stack.pop();
                        score += points;
                        continue;
                    }
                }
                stack.push(c);
            }
            // The residue — including non-a/b characters, which never pair —
            // is exactly what the other pattern's pass sweeps next.
            (stack, score)
        }
        let bytes = s.as_bytes();
        // Remove the higher-priced pattern first: by exchange, the character
        // left behind still pairs with the other kind, so this never loses.
        if x >= y {
            let (rest, score1) = remove_pairs(bytes, b'a', b'b', x);
            let (_, score2) = remove_pairs(&rest, b'b', b'a', y);
            score1 + score2
        } else {
            let (rest, score1) = remove_pairs(bytes, b'b', b'a', y);
            let (_, score2) = remove_pairs(&rest, b'a', b'b', x);
            score1 + score2
        }
    }
}
