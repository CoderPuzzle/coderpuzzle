// Sweep left to right carrying every segmentation state reachable with
// the one allowed change unspent or already spent exactly once. The
// unspent side is a single lineage (no change means the greedy is
// forced); the spent side holds (open-window mask, best completed count)
// pairs, merged on equal masks because what happens next depends only on
// the mask.
impl Solution {
    pub fn max_partitions_after_operations(s: String, k: i32) -> i32 {
        let bytes = s.as_bytes();
        let mut unspent_mask = 0i32;
        let mut unspent_count = 0i32;
        let mut spent: Vec<(i32, i32)> = Vec::new();
        for &byte in bytes {
            let bit = 1i32 << (byte - b'a');

            // Advance every spent window on the real character: a new
            // letter with k distinct already present closes the open
            // partition; otherwise the letter joins the mask.
            let mut next: Vec<(i32, i32)> = Vec::with_capacity(spent.len() + 26);
            for &(mask, count) in &spent {
                merge(&mut next, advance(mask, count, bit, k));
            }

            // Spend the change right here: branch the twenty-five other
            // letters off the unspent lineage as of [0..i-1]; each branch
            // absorbs this very position, so it lands already advanced.
            for letter in 0..26i32 {
                let branch = 1i32 << letter;
                if branch == bit {
                    continue;
                }
                merge(&mut next, advance(unspent_mask, unspent_count, branch, k));
            }
            spent = next;

            // Advance the unspent lineage on the real character.
            if unspent_mask & bit == 0 {
                if (unspent_mask as u32).count_ones() == k as u32 {
                    unspent_count += 1;
                    unspent_mask = bit;
                } else {
                    unspent_mask |= bit;
                }
            }
        }

        let mut best = unspent_count;
        for &(_, count) in &spent {
            best = best.max(count);
        }
        best + 1 // the final open partition always counts
    }
}

fn advance(mask: i32, count: i32, added: i32, k: i32) -> (i32, i32) {
    if mask & added == 0 {
        if (mask as u32).count_ones() == k as u32 {
            return (added, count + 1);
        }
        return (mask | added, count);
    }
    (mask, count)
}

fn merge(pool: &mut Vec<(i32, i32)>, (mask, count): (i32, i32)) {
    for entry in pool.iter_mut() {
        if entry.0 == mask {
            entry.1 = entry.1.max(count);
            return;
        }
    }
    pool.push((mask, count));
}
