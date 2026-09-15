use std::collections::BTreeSet;
use std::collections::HashSet;

impl Solution {
    pub fn three_sum(nums: Vec<i32>) -> Vec<Vec<i32>> {
        let n = nums.len();
        // BTreeSet of sorted value triples: a triple that closes at several
        // positions arrives several times but is kept once, and iteration
        // hands the triples out already lexicographic -- the order the
        // statement fixes, with no final sort needed.
        let mut triples: BTreeSet<[i32; 3]> = BTreeSet::new();
        // Pin each distinct value once, at its first occurrence: the suffix
        // behind the first occurrence is a superset of every later one, so
        // no distinct triple is lost and identical re-scans are skipped.
        let mut pinned: HashSet<i32> = HashSet::new();
        for i in 0..n {
            if i + 2 >= n {
                break;
            }
            let first = nums[i];
            // insert reports false when the value was already pinned.
            if !pinned.insert(first) {
                continue;
            }
            // Values already passed in this suffix. A complement found here
            // sits strictly between i and the closing element, so the three
            // values occupy three different positions.
            let mut seen: HashSet<i32> = HashSet::new();
            for &later in &nums[i + 1..] {
                let complement = -(first + later);
                if seen.contains(&complement) {
                    let mut triple = [first, complement, later];
                    triple.sort_unstable();
                    triples.insert(triple);
                }
                seen.insert(later);
            }
        }
        triples.into_iter().map(|triple| triple.to_vec()).collect()
    }
}
