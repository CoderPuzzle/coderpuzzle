import java.util.Arrays;

class Solution {

    public long[] maximumSumQueries(int[] nums1, int[] nums2, int[][] queries) {
        int n = nums1.length;
        int[][] points = new int[n][2];
        for (int j = 0; j < n; j++) {
            points[j][0] = nums1[j];
            points[j][1] = nums2[j];
        }
        Arrays.sort(points, (a, b) -> Integer.compare(b[0], a[0]));
        Integer[] order = new Integer[queries.length];
        for (int i = 0; i < queries.length; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> Integer.compare(queries[b][0], queries[a][0]));

        long[] keys = new long[n];
        long[] bests = new long[n];
        int size = 0;

        long[] answer = new long[queries.length];
        Arrays.fill(answer, -1);
        int pointIndex = 0;
        for (int qi : order) {
            int boundX = queries[qi][0];
            int boundY = queries[qi][1];
            while (pointIndex < n && points[pointIndex][0] >= boundX) {
                int x = points[pointIndex][0];
                int y = points[pointIndex][1];
                size = insert(keys, bests, size, y, (long) x + y);
                pointIndex++;
            }
            int pos = lowerBound(keys, size, boundY);
            if (pos < size) {
                answer[qi] = bests[pos];
            }
        }
        return answer;
    }

    private static int insert(long[] keys, long[] bests, int size, long y, long total) {
        int pos = lowerBound(keys, size, y);
        if (pos < size && keys[pos] == y) {
            if (bests[pos] >= total) {
                return size;
            }
            removeAt(keys, bests, size, pos);
            size--;
        }
        if (pos < size && bests[pos] >= total) {
            return size;
        }
        while (pos > 0 && bests[pos - 1] <= total) {
            removeAt(keys, bests, size, pos - 1);
            size--;
            pos--;
        }
        System.arraycopy(keys, pos, keys, pos + 1, size - pos);
        System.arraycopy(bests, pos, bests, pos + 1, size - pos);
        keys[pos] = y;
        bests[pos] = total;
        return size + 1;
    }

    private static void removeAt(long[] keys, long[] bests, int size, int index) {
        System.arraycopy(keys, index + 1, keys, index, size - index - 1);
        System.arraycopy(bests, index + 1, bests, index, size - index - 1);
    }

    private static int lowerBound(long[] keys, int size, long target) {
        int low = 0;
        int high = size;
        while (low < high) {
            int middle = (low + high) >>> 1;
            if (keys[middle] < target) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        return low;
    }
}
