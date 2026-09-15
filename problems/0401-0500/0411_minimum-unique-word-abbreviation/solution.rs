impl Solution {
    pub fn min_abbreviation(target: String, dictionary: Vec<String>) -> String {
        // One integer per same-length word: bit i is set where the word's
        // letter differs from target's. An abbreviation keeping exactly the
        // positions in K collides with that word precisely when K & diff == 0,
        // so a valid K must hit every diff mask. Words of other lengths can
        // never match an abbreviation of target and are skipped outright.
        let m = target.len();
        let mut diffs: Vec<u32> = Vec::new();
        for word in &dictionary {
            if word.len() != m {
                continue;
            }
            let mut mask: u32 = 0;
            for (i, letter) in word.bytes().enumerate() {
                if letter != target.as_bytes()[i] {
                    mask |= 1 << i;
                }
            }
            if mask != 0 && !diffs.contains(&mask) {
                diffs.push(mask);
            }
        }
        // Only minimal masks matter: a superset of another mask is hit by
        // anything that hits its subset, so it adds no constraint.
        let mut by_weight = diffs;
        by_weight.sort_by_key(|d| d.count_ones());
        let mut minimal: Vec<u32> = Vec::new();
        for &mask in &by_weight {
            if !minimal.iter().any(|&kept| kept & !mask == 0) {
                minimal.push(mask);
            }
        }

        // The bare word itself is always a valid answer.
        let mut best_len = m;
        let mut best_abbr = target.clone();
        Self::walk(
            target.as_bytes(),
            0,
            0,
            0,
            0,
            false,
            &minimal,
            &mut best_len,
            &mut best_abbr,
        );
        best_abbr
    }

    fn walk(
        target: &[u8],
        pos: usize,
        mask: u32,
        kept: usize,
        runs: usize,
        open_run: bool,
        pending: &[u32],
        best_len: &mut usize,
        best_abbr: &mut String,
    ) {
        // Cost floor: letters kept, runs closed, the run still open, and the
        // one extra letter a still-unhit word will eventually force.
        let floor = kept + runs + usize::from(open_run) + usize::from(!pending.is_empty());
        if floor > *best_len {
            return;
        }
        if pos == target.len() {
            if pending.is_empty() {
                let cost = kept + runs + usize::from(open_run);
                let abbr = Self::build(target, mask);
                if cost < *best_len || (cost == *best_len && abbr < *best_abbr) {
                    *best_len = cost;
                    *best_abbr = abbr;
                }
            }
            return;
        }
        // Abbreviate this position: a pending mask with no set bit here or
        // later can never be hit again, so the branch survives only if every
        // mask still has a bit left to aim at.
        let future = ((1u32 << target.len()) - 1) ^ ((1u32 << pos) - 1);
        if !pending.iter().any(|&d| d & future == 0) {
            Self::walk(target, pos + 1, mask, kept, runs, true, pending, best_len, best_abbr);
        }
        // Keep this letter: masks hit here are satisfied from now on.
        let still: Vec<u32> = pending.iter().copied().filter(|&d| d >> pos & 1 == 0).collect();
        Self::walk(
            target,
            pos + 1,
            mask | 1 << pos,
            kept + 1,
            runs + usize::from(open_run),
            false,
            &still,
            best_len,
            best_abbr,
        );
    }

    fn build(target: &[u8], mask: u32) -> String {
        let mut abbr = String::new();
        let mut run = 0;
        for (i, &letter) in target.iter().enumerate() {
            if mask >> i & 1 != 0 {
                if run > 0 {
                    abbr.push_str(&run.to_string());
                    run = 0;
                }
                abbr.push(letter as char);
            } else {
                run += 1;
            }
        }
        if run > 0 {
            abbr.push_str(&run.to_string());
        }
        abbr
    }
}
