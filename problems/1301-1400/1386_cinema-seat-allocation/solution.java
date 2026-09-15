import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    private static final int LEFT = 0b0000011110; // seats 2-5
    private static final int RIGHT = 0b0111100000; // seats 6-9
    private static final int MIDDLE = 0b0001111000; // seats 4-7

    public int maxNumberOfFamilies(int n, int[][] reservedSeats) {
        Map<Integer, Integer> masks = new HashMap<>();
        for (int[] seat : reservedSeats) {
            masks.merge(seat[0], 1 << (seat[1] - 1), (a, b) -> a | b);
        }
        long groups = 2L * (n - masks.size());
        for (int mask : masks.values()) {
            if ((mask & (LEFT | RIGHT)) == 0) {
                groups += 2;
            } else if ((mask & LEFT) == 0 || (mask & MIDDLE) == 0 || (mask & RIGHT) == 0) {
                groups += 1;
            }
        }
        return (int) groups;
    }
}
