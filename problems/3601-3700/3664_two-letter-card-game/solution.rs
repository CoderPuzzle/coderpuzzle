impl Solution {
    // A one-sided pool (26 counts, zeros included) plus `helpers` double-x
    // cards: every pair consumes at least one letter card, every pair needs
    // a partner outside the largest class, and only so many pairs fit at
    // all — the tight bound is the smallest.
    fn best_pairs(counts: &[i32; 26], helpers: i32) -> i32 {
        let mut total = 0;
        let mut largest = 0;
        for count in counts {
            total += count;
            if *count > largest {
                largest = *count;
            }
        }
        if total == 0 {
            return 0;
        }
        ((total + helpers) / 2).min(total + helpers - largest).min(total)
    }

    pub fn score(cards: Vec<String>, x: String) -> i32 {
        let marker = x.as_bytes()[0];
        let mut both = 0_i32;
        let mut first_only = [0_i32; 26];
        let mut second_only = [0_i32; 26];
        for card in cards {
            let bytes = card.as_bytes();
            let (a, b) = (bytes[0], bytes[1]);
            if a == marker {
                if b == marker {
                    both += 1;
                } else {
                    first_only[usize::from(b - b'a')] += 1;
                }
            } else if b == marker {
                second_only[usize::from(a - b'a')] += 1;
            }
        }

        // Each double-x card is spent on one side or the other; every
        // matching splits that way, so scanning all splits covers everything.
        let mut best = 0;
        for give in 0..=both {
            best = best.max(Self::best_pairs(&first_only, give) + Self::best_pairs(&second_only, both - give));
        }
        best
    }
}
