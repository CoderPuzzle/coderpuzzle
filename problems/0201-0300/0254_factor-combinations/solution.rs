impl Solution {
    pub fn get_factors(n: i32) -> Vec<Vec<i32>> {
        let mut combinations: Vec<Vec<i32>> = Vec::new();
        let mut current: Vec<i32> = Vec::new();
        // start is the smallest factor still allowed, so factors only grow
        // and every emitted list is ascending.
        Self::backtrack(n, 2, &mut current, &mut combinations);
        // Left-to-right growth emits each length group in lexicographic order
        // but interleaves the groups; the pinned display wants fewest factors
        // first, so reassemble by (length, lexicographic).
        combinations.sort_by(|a, b| a.len().cmp(&b.len()).then_with(|| a.cmp(b)));
        combinations
    }

    fn backtrack(remaining: i32, start: i32, current: &mut Vec<i32>, combinations: &mut Vec<Vec<i32>>) {
        let mut factor = start;
        while factor * factor <= remaining {
            if remaining % factor == 0 {
                // factor closes a combination: the cofactor remaining /
                // factor is at least factor, so both stay in [2, n - 1] and
                // the list stays ascending.
                let mut combination = current.clone();
                combination.push(factor);
                combination.push(remaining / factor);
                combinations.push(combination);
                current.push(factor);
                // Split the cofactor further; the new start stays at factor
                // so the next factor is at least as large.
                Self::backtrack(remaining / factor, factor, current, combinations);
                current.pop();
            }
            factor += 1;
        }
    }
}
