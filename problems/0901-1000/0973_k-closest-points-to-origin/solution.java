import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[][] kClosest(int[][] points, int k) {
        List<int[]> ordered = new ArrayList<>(Arrays.asList(points));
        // Squared distance ranks points identically to the Euclidean
        // distance (sqrt is monotone) while staying integer-exact.
        ordered.sort((a, b) -> Integer.compare(a[0] * a[0] + a[1] * a[1], b[0] * b[0] + b[1] * b[1]));
        int[][] result = new int[k][];
        for (int i = 0; i < k; i++) {
            result[i] = ordered.get(i);
        }
        return result;
    }
}
