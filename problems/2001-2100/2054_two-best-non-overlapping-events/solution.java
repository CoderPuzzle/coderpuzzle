import java.util.Arrays;

class Solution {

    public int maxTwoEvents(int[][] events) {
        Arrays.sort(events, (left, right) -> Integer.compare(left[0], right[0]));
        int[] suffixMaximum = new int[events.length + 1];
        for (int index = events.length - 1; index >= 0; index--) {
            suffixMaximum[index] = Math.max(events[index][2], suffixMaximum[index + 1]);
        }

        int answer = 0;
        for (int[] event : events) {
            int low = 0;
            int high = events.length;
            while (low < high) {
                int middle = low + (high - low) / 2;
                if (events[middle][0] <= event[1]) {
                    low = middle + 1;
                } else {
                    high = middle;
                }
            }
            answer = Math.max(answer, event[2] + suffixMaximum[low]);
        }

        return answer;
    }
}
