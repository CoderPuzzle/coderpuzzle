import java.util.HashMap;
import java.util.Map;

class Solution {

    public long[] countBlackBlocks(int m, int n, int[][] coordinates) {
        long[] answer = new long[5];
        Map<Long, Integer> counts = new HashMap<>();
        for (int[] coordinate : coordinates) {
            int x = coordinate[0];
            int y = coordinate[1];
            for (int dx = -1; dx <= 0; dx++) {
                for (int dy = -1; dy <= 0; dy++) {
                    int bx = x + dx;
                    int by = y + dy;
                    if (bx >= 0 && bx < m - 1 && by >= 0 && by < n - 1) {
                        counts.merge((long) bx * n + by, 1, Integer::sum);
                    }
                }
            }
        }
        answer[0] = (long) (m - 1) * (n - 1) - counts.size();
        for (int count : counts.values()) {
            answer[count]++;
        }
        return answer;
    }
}
