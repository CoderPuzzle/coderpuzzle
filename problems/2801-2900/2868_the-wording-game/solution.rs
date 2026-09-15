impl Solution {
    pub fn can_alice_win(a: Vec<String>, b: Vec<String>) -> bool {
        // A legal reply depends only on the last played word: it must be
        // lexicographically greater and start with the same letter or the
        // next one, and every earlier play is <= that word, so words are
        // never replayed. Handing the opponent a larger threshold never
        // helps them (their reply options only shrink), so inside one
        // letter a player always answers with their largest remaining
        // word there, and a jump into the next letter is played at that
        // letter's largest word. After a player spends their largest word
        // of a letter they can never play in that letter again, so the
        // fight in each letter above the first is one reply long: enter
        // with your max, opponent answers with theirs or exits upward,
        // entrant exits upward or loses.
        //
        // Sweep letters top-down with enter[c] = "the player who enters
        // this letter with their largest word wins", then resolve Bob's
        // two options at the forced opener a[0]: answer inside the letter
        // or jump to the next letter at once.
        let mut max_a: [Option<&str>; 26] = Default::default();
        let mut max_b: [Option<&str>; 26] = Default::default();
        for w in &a {
            max_a[(w.as_bytes()[0] - b'a') as usize] = Some(w.as_str());
        }
        for w in &b {
            max_b[(w.as_bytes()[0] - b'a') as usize] = Some(w.as_str());
        }
        let mut ent_a = [false; 26];
        let mut ent_b = [false; 26];
        for c in (0..26).rev() {
            let next = if c < 25 { Some(c + 1) } else { None };
            if max_a[c].is_some() {
                let bob_exit = match next {
                    Some(n) => max_b[n].is_some() && ent_b[n],
                    None => false,
                };
                let bob_stay = max_b[c].is_some()
                    && max_b[c].unwrap() > max_a[c].unwrap()
                    && !match next {
                        Some(n) => max_a[n].is_some() && ent_a[n],
                        None => false,
                    };
                ent_a[c] = !(bob_exit || bob_stay);
            }
            if max_b[c].is_some() {
                let alice_exit = match next {
                    Some(n) => max_a[n].is_some() && ent_a[n],
                    None => false,
                };
                let alice_stay = max_a[c].is_some()
                    && max_a[c].unwrap() > max_b[c].unwrap()
                    && !match next {
                        Some(n) => max_b[n].is_some() && ent_b[n],
                        None => false,
                    };
                ent_b[c] = !(alice_exit || alice_stay);
            }
        }
        let c0 = (a[0].as_bytes()[0] - b'a') as usize;
        let bob_exit = c0 < 25 && max_b[c0 + 1].is_some() && ent_b[c0 + 1];
        let mut battle = false;
        if let Some(b1) = max_b[c0] {
            if b1 > a[0].as_str() {
                let alice_exit = c0 < 25 && max_a[c0 + 1].is_some() && ent_a[c0 + 1];
                let a1_wins = max_a[c0].is_some() && max_a[c0].unwrap() > b1 && !bob_exit;
                battle = !(a1_wins || alice_exit);
            }
        }
        !(bob_exit || battle)
    }
}
