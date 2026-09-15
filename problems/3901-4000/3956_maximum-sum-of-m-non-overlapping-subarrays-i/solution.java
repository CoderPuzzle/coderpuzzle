import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public long maximumSum(int[] nums, int m, int l, int r) {
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 1; i <= n; i++) prefix[i] = prefix[i - 1] + nums[i - 1];

        long impossible = Long.MIN_VALUE / 4;
        long[] previous = new long[n + 1];
        long answer = impossible;

        for (int count = 1; count <= Math.min(m, n / l); count++) {
            long[] current = new long[n + 1];
            java.util.Arrays.fill(current, impossible);
            Deque<Integer> candidates = new ArrayDeque<>();

            for (int end = 1; end <= n; end++) {
                int start = end - l;
                if (start >= 0 && previous[start] != impossible) {
                    long value = previous[start] - prefix[start];
                    while (!candidates.isEmpty()) {
                        int last = candidates.peekLast();
                        if (previous[last] - prefix[last] > value) break;
                        candidates.removeLast();
                    }
                    candidates.addLast(start);
                }

                int earliest = end - r;
                while (!candidates.isEmpty() && candidates.peekFirst() < earliest) {
                    candidates.removeFirst();
                }

                current[end] = current[end - 1];
                if (!candidates.isEmpty()) {
                    int bestStart = candidates.peekFirst();
                    current[end] = Math.max(current[end], prefix[end] + previous[bestStart] - prefix[bestStart]);
                }
            }
            answer = Math.max(answer, current[n]);
            previous = current;
        }
        return answer;
    }
}
