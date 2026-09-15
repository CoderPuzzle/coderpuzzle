// A 3-tile window centered on tile i alternates exactly when both of i's
// circular neighbors differ from it, so count the tiles whose previous and
// next tiles (wrapping around) hold the opposite color.
impl Solution {
    pub fn number_of_alternating_groups(colors: Vec<i32>) -> i32 {
        let n = colors.len();
        let mut count = 0;
        for i in 0..n {
            let prev = colors[(i + n - 1) % n];
            let next = colors[(i + 1) % n];
            if prev != colors[i] && colors[i] != next {
                count += 1;
            }
        }
        count
    }
}
