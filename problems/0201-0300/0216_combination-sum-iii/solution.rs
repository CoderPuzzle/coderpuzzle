impl Solution {
    pub fn combination_sum3(k: i32, n: i32) -> Vec<Vec<i32>> {
        let mut combinations: Vec<Vec<i32>> = Vec::new();
        let mut current: Vec<i32> = Vec::new();
        // start moves past each picked digit, so each number 1 through 9 is
        // used at most once.
        Self::backtrack(1, k, n, &mut current, &mut combinations);
        combinations
    }

    fn backtrack(start: i32, slots: i32, remaining: i32, current: &mut Vec<i32>, combinations: &mut Vec<Vec<i32>>) {
        if slots == 0 {
            // k digits chosen: valid only when they sum to n exactly.
            if remaining == 0 {
                combinations.push(current.clone());
            }
            return;
        }
        // A digit must leave slots - 1 larger digits behind, which caps it
        // at 10 - slots.
        for digit in start..=(10 - slots) {
            // Digits grow across the loop, so the first one that overshoots
            // the remaining budget ends the loop.
            if digit > remaining {
                break;
            }
            current.push(digit);
            Self::backtrack(digit + 1, slots - 1, remaining - digit, current, combinations);
            current.pop();
        }
    }
}
