impl Solution {
    pub fn leftMostColumnWithOne(matrix: &mut BinaryMatrix) -> i32 {
        let size = matrix.dimensions();
        let rows = size[0];
        let cols = size[1];
        // Per-row binary search for the first 1: a 1 at mid is the best
        // sighting in this row so far (keep searching left of it), a 0 at
        // mid means the row switches strictly right of mid (skip mid and
        // everything left of it); the answer is the minimum over rows.
        let mut answer: i32 = -1;
        for row in 0..rows {
            let mut lo: i32 = 0;
            let mut hi: i32 = cols - 1;
            let mut first: i32 = -1;
            while lo <= hi {
                let mid = (lo + hi) / 2;
                if matrix.get(row, mid) == 1 {
                    first = mid;
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            }
            if first != -1 && (answer == -1 || first < answer) {
                answer = first;
            }
        }
        answer
    }
}
