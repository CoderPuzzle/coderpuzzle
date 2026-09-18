class Solution {
    leftMostColumnWithOne(matrix: BinaryMatrix): number {
        const size = matrix.dimensions();
        const rows = size[0];
        const cols = size[1];
        // Per-row binary search for the first 1: a 1 at mid is the best
        // sighting in this row so far (keep searching left of it), a 0 at
        // mid means the row switches strictly right of mid (skip mid and
        // everything left of it); the answer is the minimum over rows.
        let answer = -1;
        for (let row = 0; row < rows; row++) {
            let lo = 0;
            let hi = cols - 1;
            let first = -1;
            while (lo <= hi) {
                const mid = Math.floor((lo + hi) / 2);
                if (matrix.get(row, mid) === 1) {
                    first = mid;
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            }
            if (first !== -1 && (answer === -1 || first < answer)) {
                answer = first;
            }
        }
        return answer;
    }
}
