import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        int j = 0;
        while (i < firstList.length && j < secondList.length) {
            // The overlap of the two current intervals is [max starts,
            // min ends]; lo <= hi means they intersect (closed intervals,
            // so touching endpoints still count).
            int lo = Math.max(firstList[i][0], secondList[j][0]);
            int hi = Math.min(firstList[i][1], secondList[j][1]);
            if (lo <= hi) {
                result.add(new int[] { lo, hi });
            }
            // Retire the interval that ends earlier: later intervals in the
            // other list start strictly after its end, so it is done forever.
            if (firstList[i][1] < secondList[j][1]) {
                i++;
            } else {
                j++;
            }
        }
        return result.toArray(new int[0][]);
    }
}
