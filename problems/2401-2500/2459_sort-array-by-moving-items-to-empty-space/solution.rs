impl Solution {
    pub fn sort_array(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // sigma[i] = destination slot of the item currently at slot i.
        let ops_for = |target: &[usize]| -> i32 {
            let sigma: Vec<usize> = nums.iter().map(|&v| target[v as usize]).collect();
            let blank = nums.iter().position(|&v| v == 0).unwrap();
            let mut visited = vec![false; n];
            let mut total = 0i32;
            for i in 0..n {
                if visited[i] {
                    continue;
                }
                // Walk one cycle of the permutation i -> sigma[i].
                let mut length = 0i32;
                let mut has_blank = false;
                let mut j = i;
                while !visited[j] {
                    visited[j] = true;
                    if j == blank {
                        has_blank = true;
                    }
                    length += 1;
                    j = sigma[j];
                }
                if has_blank {
                    // Each move drops one item into the hole the blank
                    // occupies, walking the blank home: length - 1 moves.
                    total += length - 1;
                } else if length >= 2 {
                    // One extra move pulls the blank into this cycle (an
                    // item gets displaced to the blank's own goal), then L
                    // in-cycle placements return it: L + 1 moves.
                    total += length + 1;
                }
                // Length-1 cycles are already home and cost nothing.
            }
            total
        };
        // Two sorted layouts exist — blank last or blank first; compare both
        // (an array cheap for one goal can be dear for the other).
        let target_a: Vec<usize> = (0..n).map(|v| if v == 0 { n - 1 } else { v - 1 }).collect();
        let target_b: Vec<usize> = (0..n).collect();
        ops_for(&target_a).min(ops_for(&target_b))
    }
}
