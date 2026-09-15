import java.util.HashMap;
import java.util.Map;

class Solution {

    public long interchangeableRectangles(int[][] rectangles) {
        long total = 0;
        Map<Long, Long> counts = new HashMap<>();
        for (int[] rectangle : rectangles) {
            int divisor = gcd(rectangle[0], rectangle[1]);
            long key = (long) (rectangle[0] / divisor) * 100001 + rectangle[1] / divisor;
            long previous = counts.getOrDefault(key, 0L);
            total += previous;
            counts.put(key, previous + 1);
        }
        return total;
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            int remainder = a % b;
            a = b;
            b = remainder;
        }
        return a;
    }
}
