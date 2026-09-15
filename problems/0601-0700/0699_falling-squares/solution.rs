// Coordinate compression: every left and right edge becomes a cell boundary,
// so each square's footprint is a run of compressed cells and touching edges
// share no cell — exactly the brushing rule. Heights stay in i32 range: at
// most 1000 * 10^6 = 10^9 < 2^31.
use std::collections::BTreeMap;

impl Solution {
    pub fn falling_squares(positions: Vec<Vec<i32>>) -> Vec<i32> {
        let mut coords: Vec<i32> = positions
            .iter()
            .flat_map(|square| [square[0], square[0] + square[1]])
            .collect();
        coords.sort();
        coords.dedup();
        let index: BTreeMap<i32, usize> = coords.iter().enumerate().map(|(i, &x)| (x, i)).collect();
        // heights[k] is the top height over the cell [coords[k], coords[k+1]).
        let mut heights = vec![0; coords.len()];
        let mut ans = Vec::with_capacity(positions.len());
        let mut best = 0;
        for square in &positions {
            let lo = index[&square[0]];
            let hi = index[&(square[0] + square[1])];
            // The square lands on the tallest top among the cells it covers.
            let mut top = square[1];
            for cell in lo..hi {
                top = top.max(square[1] + heights[cell]);
            }
            for cell in lo..hi {
                heights[cell] = top;
            }
            best = best.max(top);
            ans.push(best);
        }
        ans
    }
}
