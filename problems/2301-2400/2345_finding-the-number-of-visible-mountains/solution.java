import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int visibleMountains(int[][] peaks) {
        // Mountain (x, y) contains peak (a, b) exactly when |a - x| <= y - b:
        // the peak sits inside or on the slopes. Sorting by x ascending
        // (ties by y descending) puts every potential coverer no later, so
        // a monotonic stack settles everything in one pass. Duplicated
        // peaks are invisible but still hide others, so they stay on the
        // stack for their covering effect and are only excluded from the
        // final count.
        Arrays.sort(peaks, (p, q) -> {
            if (p[0] != q[0]) {
                return Integer.compare(p[0], q[0]);
            }
            return Integer.compare(q[1], p[1]);
        });
        List<int[]> stack = new ArrayList<>(); // {x, y, counted}
        int i = 0;
        while (i < peaks.length) {
            int j = i; // run-length encode equal peaks to detect duplicates
            while (j < peaks.length && peaks[j][0] == peaks[i][0] && peaks[j][1] == peaks[i][1]) {
                ++j;
            }
            boolean duplicated = j - i > 1;
            int x = peaks[i][0],
                y = peaks[i][1];
            while (
                !stack.isEmpty() && Math.abs(stack.get(stack.size() - 1)[0] - x) <= y - stack.get(stack.size() - 1)[1]
            ) {
                stack.remove(stack.size() - 1);
            }
            boolean covered =
                !stack.isEmpty() && Math.abs(x - stack.get(stack.size() - 1)[0]) <= stack.get(stack.size() - 1)[1] - y;
            if (!covered) {
                stack.add(new int[] { x, y, duplicated ? 0 : 1 });
            }
            i = j;
        }
        int visible = 0;
        for (int[] entry : stack) {
            visible += entry[2];
        }
        return visible;
    }
}
