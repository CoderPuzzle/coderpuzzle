import java.util.Arrays;

class Solution {

    public int[] maximumBeauty(int[][] items, int[] queries) {
        Arrays.sort(items, (left, right) -> Integer.compare(left[0], right[0]));
        int[] prefixBeauty = new int[items.length];
        int best = 0;
        for (int index = 0; index < items.length; index++) {
            best = Math.max(best, items[index][1]);
            prefixBeauty[index] = best;
        }

        int[] answer = new int[queries.length];
        for (int index = 0; index < queries.length; index++) {
            int low = 0;
            int high = items.length;
            while (low < high) {
                int middle = low + (high - low) / 2;
                if (items[middle][0] <= queries[index]) {
                    low = middle + 1;
                } else {
                    high = middle;
                }
            }
            answer[index] = low == 0 ? 0 : prefixBeauty[low - 1];
        }
        return answer;
    }
}
