impl Solution {
    // Horizontal and vertical moves touch disjoint coordinates, and a
    // peaceful board needs row indices {0..n-1} once each (columns too).
    // So each axis decouples: pair the k-th smallest coordinate of that
    // axis with target index k-1 — rearrangement keeps this optimal.
    // Worst case per axis is n*(n-1)/2 <= 124750, so the sum fits i32.
    pub fn min_moves(rooks: Vec<Vec<i32>>) -> i32 {
        let mut xs: Vec<i32> = rooks.iter().map(|r| r[0]).collect();
        let mut ys: Vec<i32> = rooks.iter().map(|r| r[1]).collect();
        xs.sort_unstable();
        ys.sort_unstable();
        let mut moves = 0i32;
        for i in 0..rooks.len() {
            moves += (xs[i] - i as i32).abs() + (ys[i] - i as i32).abs();
        }
        moves
    }
}
