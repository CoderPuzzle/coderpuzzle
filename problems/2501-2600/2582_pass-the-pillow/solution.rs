impl Solution {
    pub fn pass_the_pillow(n: i32, time: i32) -> i32 {
        // One forward traversal of the line spans n - 1 seconds, so the
        // walk decomposes into full traversals plus a remainder leg. An
        // even count of traversals ends moving forward from person 1; an
        // odd count ends moving backward from person n.
        let (legs, rem) = (time / (n - 1), time % (n - 1));
        if legs % 2 == 0 {
            1 + rem
        } else {
            n - rem
        }
    }
}
