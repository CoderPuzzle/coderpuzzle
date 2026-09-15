import java.util.Arrays;

class Solution {

    public int[] platesBetweenCandles(String s, int[][] queries) {
        int length = s.length();
        int[] platePrefix = new int[length + 1];
        int[] leftNearest = new int[length];
        int nearest = -1;
        for (int index = 0; index < length; ++index) {
            platePrefix[index + 1] = platePrefix[index] + (s.charAt(index) == '*' ? 1 : 0);
            if (s.charAt(index) == '|') nearest = index;
            leftNearest[index] = nearest;
        }

        int[] rightNearest = new int[length];
        Arrays.fill(rightNearest, -1);
        nearest = -1;
        for (int index = length - 1; index >= 0; --index) {
            if (s.charAt(index) == '|') nearest = index;
            rightNearest[index] = nearest;
        }

        int[] answer = new int[queries.length];
        for (int index = 0; index < queries.length; ++index) {
            int leftCandle = rightNearest[queries[index][0]];
            int rightCandle = leftNearest[queries[index][1]];
            if (leftCandle != -1 && rightCandle != -1 && leftCandle < rightCandle) {
                answer[index] = platePrefix[rightCandle] - platePrefix[leftCandle];
            }
        }
        return answer;
    }
}
