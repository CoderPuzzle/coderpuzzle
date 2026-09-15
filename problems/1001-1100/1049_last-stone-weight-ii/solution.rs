impl Solution {
    pub fn last_stone_weight_ii(stones: Vec<i32>) -> i32 {
        // Smash order is irrelevant: the last stone is a signed sum, so the
        // task is a two-group partition minimizing the difference of sums.
        let total: i32 = stones.iter().sum();
        // With group A + group B = total fixed, minimizing total - 2*sum(A)
        // means pushing sum(A) as close to total/2 as possible.
        let target = total / 2;
        let mut reachable = vec![false; target as usize + 1];
        reachable[0] = true;
        for &value in &stones {
            let v = value as usize;
            // Descend so a stone can't be counted twice in the same sum.
            for s in (v..=target as usize).rev() {
                if reachable[s - v] {
                    reachable[s] = true;
                }
            }
        }
        // Largest reachable subset sum at most target.
        let best = (0..=target as usize).rev().find(|&s| reachable[s]).unwrap();
        total - 2 * best as i32
    }
}
