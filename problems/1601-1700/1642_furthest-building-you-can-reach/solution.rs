use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn furthest_building(heights: Vec<i32>, bricks: i32, ladders: i32) -> i32 {
        // Min-heap of the climbs covered by ladders
        let mut ladder_climbs: BinaryHeap<Reverse<i32>> = BinaryHeap::new();
        let mut bricks = bricks;
        for i in 0..heights.len() - 1 {
            let climb = heights[i + 1] - heights[i];
            if climb <= 0 {
                continue;
            }
            ladder_climbs.push(Reverse(climb));
            if ladder_climbs.len() as i32 > ladders {
                bricks -= ladder_climbs.pop().unwrap().0;
                if bricks < 0 {
                    return i as i32;
                }
            }
        }
        heights.len() as i32 - 1
    }
}
