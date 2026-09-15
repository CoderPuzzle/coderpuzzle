impl Solution {
    pub fn max_coins(mut piles: Vec<i32>) -> i32 {
        // Sort ascending. Bob permanently absorbs the n smallest piles
        // (indices 0..n-1); of what's left, you take every other pile
        // starting at index n, and Alice takes the rest.
        piles.sort();
        let n = piles.len() / 3;
        let mut total = 0;
        let mut idx = n;
        for _ in 0..n {
            total += piles[idx];
            idx += 2;
        }
        total
    }
}
