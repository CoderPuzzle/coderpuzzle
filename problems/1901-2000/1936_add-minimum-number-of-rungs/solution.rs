impl Solution {
    pub fn add_rungs(rungs: Vec<i32>, dist: i32) -> i32 {
        // Greedy: bridge each gap with as few rungs as possible, placing
        // each new rung as high as the current position allows. A gap of g
        // between two heights needs ceil(g / dist) - 1 extra rungs.
        let mut added = 0;
        let mut current = 0;
        for height in rungs {
            let gap = height - current;
            added += (gap - 1) / dist;
            current = height;
        }
        added
    }
}
