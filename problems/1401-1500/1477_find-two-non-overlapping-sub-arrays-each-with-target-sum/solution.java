import java.util.Arrays;

class Solution {

    public int minSumOfLengths(int[] arr, long target) {
        int n = arr.length;
        final int INF = Integer.MAX_VALUE / 2;
        int[] best = new int[n];
        Arrays.fill(best, INF);
        int answer = INF;
        int bestSoFar = INF;
        long windowSum = 0;
        int left = 0;
        for (int right = 0; right < n; right++) {
            windowSum += arr[right];
            while (windowSum > target) {
                windowSum -= arr[left];
                left++;
            }
            if (windowSum == target) {
                int length = right - left + 1;
                if (left > 0 && best[left - 1] != INF) {
                    answer = Math.min(answer, best[left - 1] + length);
                }
                bestSoFar = Math.min(bestSoFar, length);
            }
            best[right] = bestSoFar;
        }
        return answer >= INF ? -1 : answer;
    }
}
