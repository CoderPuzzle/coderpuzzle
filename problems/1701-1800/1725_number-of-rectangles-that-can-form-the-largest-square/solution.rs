// Each rectangle independently caps a square at side min(l, w), so the
// answer is the largest of those minima and how many rectangles attain
// it: reset the count on a new maximum, increment it on a tie.
impl Solution {
    pub fn count_good_rectangles(rectangles: Vec<Vec<i32>>) -> i32 {
        let mut best_side = 0;
        let mut count = 0;
        for rectangle in &rectangles {
            let side = rectangle[0].min(rectangle[1]);
            if side > best_side {
                best_side = side;
                count = 1;
            } else if side == best_side {
                count += 1;
            }
        }
        count
    }
}
