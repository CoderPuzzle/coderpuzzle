import java.util.ArrayList;
import java.util.List;

class Solution {

    public int maxPathLength(int[][] coordinates, int k) {
        int pivotX = coordinates[k][0];
        int pivotY = coordinates[k][1];
        List<int[]> below = new ArrayList<>();
        List<int[]> above = new ArrayList<>();
        for (int[] point : coordinates) {
            if (point[0] < pivotX && point[1] < pivotY) {
                below.add(point);
            } else if (point[0] > pivotX && point[1] > pivotY) {
                above.add(point);
            }
        }
        return 1 + longestChain(below) + longestChain(above);
    }

    private int longestChain(List<int[]> points) {
        points.sort((a, b) -> {
            if (a[0] != b[0]) {
                return Integer.compare(a[0], b[0]);
            }
            return Integer.compare(b[1], a[1]);
        });
        int[] tails = new int[points.size()];
        int length = 0;
        for (int[] point : points) {
            int y = point[1];
            int low = 0;
            int high = length;
            while (low < high) {
                int mid = (low + high) >>> 1;
                if (tails[mid] < y) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            tails[low] = y;
            if (low == length) {
                length++;
            }
        }
        return length;
    }
}
