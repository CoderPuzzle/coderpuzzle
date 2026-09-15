impl Solution {
    pub fn get_hint(secret: String, guess: String) -> String {
        // Bulls are positional matches, tallied directly. Every other digit
        // drops into one of two 10-slot counters — one per side — and the
        // cows are the multiset overlap of the two leftovers, min per digit.
        let (secret, guess) = (secret.as_bytes(), guess.as_bytes());
        let mut bulls = 0;
        let mut secret_left = [0; 10];
        let mut guess_left = [0; 10];
        for index in 0..secret.len() {
            if secret[index] == guess[index] {
                bulls += 1;
            } else {
                // Only unmatched positions feed the cow pools: an exact match
                // consumes one copy of the digit on both sides up front.
                secret_left[(secret[index] - b'0') as usize] += 1;
                guess_left[(guess[index] - b'0') as usize] += 1;
            }
        }
        // A leftover guess digit needs a leftover secret partner, so any
        // surplus copy beyond the other counter simply dies.
        let cows: i32 = (0..10).map(|digit| secret_left[digit].min(guess_left[digit])).sum();
        format!("{}A{}B", bulls, cows)
    }
}
