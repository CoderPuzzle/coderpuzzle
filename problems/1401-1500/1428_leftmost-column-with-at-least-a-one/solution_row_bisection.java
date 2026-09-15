import java.util.List;

class Solution {

    public int leftMostColumnWithOne(BinaryMatrix matrix) {
        List<Integer> size = matrix.dimensions();
        int rows = size.get(0);
        int cols = size.get(1);
        // Per-row binary search for the first 1: a 1 at mid is the best
        // sighting in this row so far (keep searching left of it), a 0 at
        // mid means the row switches strictly right of mid (skip mid and
        // everything left of it); the answer is the minimum over rows.
        int answer = -1;
        for (int row = 0; row < rows; row++) {
            int lo = 0;
            int hi = cols - 1;
            int first = -1;
            while (lo <= hi) {
                int mid = (lo + hi) / 2;
                if (matrix.get(row, mid) == 1) {
                    first = mid;
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            }
            if (first != -1 && (answer == -1 || first < answer)) {
                answer = first;
            }
        }
        return answer;
    }
}
