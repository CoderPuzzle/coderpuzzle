impl Solution {
    // Removing a run of t consecutive bars merges t+1 lines of cells
    // into one span, so each axis contributes side = longest run + 1 and
    // the square is limited by the smaller side. Only the bar lists
    // matter — n and m only bound where bars may sit. The area is at
    // most 101^2, well inside i32.
    fn longest_run(bars: &mut Vec<i32>) -> i32 {
        bars.sort();
        let mut best = 1;
        let mut cur = 1;
        for i in 1..bars.len() {
            cur = if bars[i] == bars[i - 1] + 1 { cur + 1 } else { 1 };
            best = best.max(cur);
        }
        best
    }

    pub fn maximize_square_hole_area(n: i32, m: i32, h_bars: Vec<i32>, v_bars: Vec<i32>) -> i32 {
        let mut h_bars = h_bars;
        let mut v_bars = v_bars;
        let side = Self::longest_run(&mut h_bars).min(Self::longest_run(&mut v_bars)) + 1;
        side * side
    }
}
