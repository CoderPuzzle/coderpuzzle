impl Solution {
    pub fn min_domino_rotations(tops: Vec<i32>, bottoms: Vec<i32>) -> i32 {
        // For candidate value x, one pass decides whether every domino can
        // show x on some face, and if so, the cheaper of "rotate x onto
        // every top" vs "rotate x onto every bottom".
        let check = |x: i32| -> i32 {
            let mut rotations_top = 0;
            let mut rotations_bottom = 0;
            for i in 0..tops.len() {
                if tops[i] != x && bottoms[i] != x {
                    return -1;
                } else if tops[i] != x {
                    rotations_top += 1;
                } else if bottoms[i] != x {
                    rotations_bottom += 1;
                }
            }
            rotations_top.min(rotations_bottom)
        };

        // Only tops[0] or bottoms[0] can ever fill a whole row, since the
        // very first domino must already carry the value on one face.
        let result = check(tops[0]);
        if result != -1 || tops[0] == bottoms[0] {
            return result;
        }
        check(bottoms[0])
    }
}
