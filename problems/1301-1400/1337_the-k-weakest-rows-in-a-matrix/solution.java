import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] kWeakestRows(int[][] mat, int k) {
        // Weakness order == lexicographic order of (soldiers, index); rows
        // are all 1's then 0's, so the sum is the first-civilian index too.
        List<int[]> ranked = new ArrayList<>();
        for (int i = 0; i < mat.length; ++i) {
            int soldiers = 0;
            for (int value : mat[i]) {
                soldiers += value;
            }
            ranked.add(new int[] { soldiers, i });
        }
        ranked.sort((a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
        int[] out = new int[k];
        for (int i = 0; i < k; ++i) {
            out[i] = ranked.get(i)[1];
        }
        return out;
    }
}
