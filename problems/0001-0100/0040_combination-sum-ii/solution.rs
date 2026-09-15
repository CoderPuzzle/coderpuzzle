impl Solution {
    pub fn combination_sum2(mut candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
        // Sort in place (we own the vec): every emitted combination is
        // ascending, and growing combinations left to right emits them in
        // lexicographic order.
        candidates.sort_unstable();
        let mut combinations: Vec<Vec<i32>> = Vec::new();
        let mut current: Vec<i32> = Vec::new();
        // start moves past each picked index, so every candidate number is
        // used at most once.
        Self::backtrack(&candidates, 0, target, &mut current, &mut combinations);
        combinations
    }

    fn backtrack(
        candidates: &[i32],
        start: usize,
        remaining: i32,
        current: &mut Vec<i32>,
        combinations: &mut Vec<Vec<i32>>,
    ) {
        if remaining == 0 {
            // Hit the target exactly: snapshot the current path.
            combinations.push(current.clone());
            return;
        }
        for i in start..candidates.len() {
            // A value equal to the one just abandoned at this depth would
            // rebuild the same combination, so skip runs of equal values.
            if i > start && candidates[i] == candidates[i - 1] {
                continue;
            }
            // Sorted order means the first value too large to fit ends the
            // loop: every later value is at least as large.
            if candidates[i] > remaining {
                break;
            }
            current.push(candidates[i]);
            // i + 1, not i: every candidate number may be used only once.
            Self::backtrack(candidates, i + 1, remaining - candidates[i], current, combinations);
            current.pop();
        }
    }
}
