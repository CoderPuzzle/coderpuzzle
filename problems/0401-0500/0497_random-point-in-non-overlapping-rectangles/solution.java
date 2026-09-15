import java.util.concurrent.ThreadLocalRandom;

class Solution {

    // Prefix sums over rectangle areas (integer cells, (xi-ai+1)*(yi-bi+1))
    // select a rectangle with probability proportional to its area; a
    // uniform cell offset inside it yields the point — so every covered
    // integer point is exactly equally likely.
    private final int[][] rects;
    private final long[] prefix;

    public Solution(int[][] rects) {
        this.rects = rects;
        this.prefix = new long[rects.length + 1];
        for (int i = 0; i < rects.length; i++) {
            int width = rects[i][2] - rects[i][0] + 1;
            int height = rects[i][3] - rects[i][1] + 1;
            prefix[i + 1] = prefix[i] + (long) width * height;
        }
    }

    public int[] pick() {
        long cell = ThreadLocalRandom.current().nextLong(prefix[rects.length]);
        int low = 1,
            high = prefix.length - 1; // first index with prefix[i] > cell
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (prefix[mid] > cell) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        int[] rect = rects[low - 1];
        int width = rect[2] - rect[0] + 1;
        long offset = cell - prefix[low - 1];
        return new int[] { rect[0] + (int) (offset % width), rect[1] + (int) (offset / width) };
    }
}
