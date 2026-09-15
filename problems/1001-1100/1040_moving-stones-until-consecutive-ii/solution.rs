impl Solution {
    pub fn num_moves_stones_ii(stones: Vec<i32>) -> Vec<i32> {
        let mut stones = stones;
        stones.sort();
        let n = stones.len() as i32;
        if stones[stones.len() - 1] - stones[0] == n - 1 {
            // Already n consecutive integers: no legal move exists.
            return vec![0, 0];
        }

        // Maximum: play it out from whichever side wastes fewer stones.
        // Losing the low side (never touching it) wastes stones[1] - stones[0]
        // of already-occupied span; losing the high side wastes
        // stones[n-1] - stones[n-2]. Take the larger resulting move count.
        let last = stones.len() - 1;
        let max_moves = std::cmp::max(
            stones[last] - stones[1] - (n - 2),
            stones[last - 1] - stones[0] - (n - 2),
        );

        // Minimum: slide a window of n consecutive integer values across the
        // sorted positions; a window already holding k stones needs n - k
        // moves to fill the rest.
        let mut min_moves = n;
        let mut left = 0usize;
        for right in 0..stones.len() {
            while stones[right] - stones[left] + 1 > n {
                left += 1;
            }
            let already_placed = (right - left + 1) as i32;
            let mut cost = n - already_placed;
            if cost == 1 && already_placed == n - 1 && stones[right] - stones[left] == n - 2 {
                // Classic gotcha: n - 1 stones already packed with zero
                // gaps. The lone outside stone can't jump straight into
                // the missing slot without still being an endpoint, so it
                // needs a throwaway hop first -- 2 moves, not 1.
                cost = 2;
            }
            min_moves = min_moves.min(cost);
        }

        vec![min_moves, max_moves]
    }
}
