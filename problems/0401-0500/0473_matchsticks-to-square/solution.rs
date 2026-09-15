impl Solution {
    pub fn makesquare(matchsticks: Vec<i32>) -> bool {
        let total: i64 = matchsticks.iter().map(|&v| v as i64).sum();
        // A square is 4 equal-length groups: the total must split evenly
        // and no single stick may exceed the side.
        if total % 4 != 0 {
            return false;
        }
        let side = total / 4;
        // Descending order places the most constrained sticks first, so a
        // dead end appears after only a few branches.
        let mut sticks = matchsticks;
        sticks.sort_unstable_by(|a, b| b.cmp(a));
        if sticks.is_empty() || (sticks[0] as i64) > side {
            return false;
        }
        let mut sides = [0i64; 4];
        Self::dfs(&sticks, &mut sides, side, 0)
    }

    fn dfs(sticks: &[i32], sides: &mut [i64; 4], side: i64, i: usize) -> bool {
        // Guaranteed by the capacity checks + total = 4 * side; kept as a
        // final safety assertion.
        if i == sticks.len() {
            return sides.iter().all(|&s| s == side);
        }
        let value = sticks[i] as i64;
        let mut tried: Vec<i64> = Vec::new();
        for j in 0..4 {
            // Sides with equal current length are interchangeable — trying
            // one per distinct length skips symmetric states.
            if tried.contains(&sides[j]) {
                continue;
            }
            tried.push(sides[j]);
            // Place/recurse/undo on every side with room left.
            if sides[j] + value <= side {
                sides[j] += value;
                if Self::dfs(sticks, sides, side, i + 1) {
                    return true;
                }
                sides[j] -= value;
            }
        }
        false
    }
}
