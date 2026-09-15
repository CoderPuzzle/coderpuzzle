import java.util.Arrays;

class Solution {

    public int countDays(int days, int[][] meetings) {
        Arrays.sort(meetings, (a, b) -> Integer.compare(a[0], b[0]));
        long free = 0;
        long lastEnd = 0;
        for (int[] meeting : meetings) {
            int start = meeting[0];
            int end = meeting[1];
            if (start > lastEnd) {
                free += start - lastEnd - 1;
            }
            if (end > lastEnd) {
                lastEnd = end;
            }
        }
        free += days - lastEnd;
        return (int) free;
    }
}
