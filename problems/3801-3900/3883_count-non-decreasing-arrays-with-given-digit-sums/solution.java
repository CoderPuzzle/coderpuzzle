import java.util.ArrayList;
import java.util.List;

class Solution {

    public int countArrays(int[] digitSum) {
        final int MOD = 1_000_000_007;
        // Group every value 0..5000 by the sum of its digits; the groups
        // are sorted, so a prefix sum plus upper-bound counts every
        // predecessor whose value is at most a candidate's value in O(log).
        List<List<Integer>> groups = new ArrayList<>();
        for (int sum = 0; sum <= 50; sum++) {
            groups.add(new ArrayList<>());
        }
        for (int value = 0; value <= 5000; value++) {
            int total = 0;
            int rest = value;
            while (rest > 0) {
                total += rest % 10;
                rest /= 10;
            }
            groups.get(total).add(value);
        }
        List<Integer> previous = groups.get(digitSum[0]);
        if (previous.isEmpty()) return 0;
        long[] dp = new long[previous.size()];
        java.util.Arrays.fill(dp, 1L);
        for (int position = 1; position < digitSum.length; position++) {
            List<Integer> current = groups.get(digitSum[position]);
            if (current.isEmpty()) return 0;
            long[] prefix = new long[dp.length + 1];
            for (int i = 0; i < dp.length; i++) {
                prefix[i + 1] = (prefix[i] + dp[i]) % MOD;
            }
            long[] next = new long[current.size()];
            for (int k = 0; k < current.size(); k++) {
                next[k] = prefix[upperBound(previous, current.get(k))];
            }
            dp = next;
            previous = current;
        }
        long answer = 0;
        for (long ways : dp) {
            answer = (answer + ways) % MOD;
        }
        return (int) answer;
    }

    private int upperBound(List<Integer> sorted, int target) {
        int lo = 0;
        int hi = sorted.size();
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (sorted.get(mid) <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
