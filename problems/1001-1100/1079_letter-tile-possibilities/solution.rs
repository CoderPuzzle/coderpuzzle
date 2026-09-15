impl Solution {
    pub fn num_tile_possibilities(tiles: String) -> i32 {
        // Array of 26 counts keyed by letter, not a permutation of indices:
        // identical tiles collapse into one branch, so a sequence built from
        // duplicate letters is only ever counted once.
        let mut counts = [0i32; 26];
        for b in tiles.bytes() {
            counts[(b - b'A') as usize] += 1;
        }

        fn backtrack(counts: &mut [i32; 26]) -> i32 {
            let mut total = 0;
            for i in 0..26 {
                if counts[i] == 0 {
                    continue;
                }
                // Placing this letter is itself one new, distinct sequence.
                counts[i] -= 1;
                total += 1 + backtrack(counts);
                counts[i] += 1;
            }
            total
        }

        backtrack(&mut counts)
    }
}
