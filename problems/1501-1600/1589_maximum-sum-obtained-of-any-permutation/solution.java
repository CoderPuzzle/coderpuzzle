import java.util.Arrays;

class Solution {

    private static final long MOD = 1_000_000_007L;

    public int maxSumRangeQuery(int[] nums, int[][] requests) {
        int n = nums.length;
        // Difference array: +1 at the start of each request's range, -1 just
        // past its end; a prefix sum then turns this into per-index request
        // coverage counts instead of re-walking every request's range.
        int[] diff = new int[n + 1];
        for (int[] request : requests) {
            diff[request[0]] += 1;
            diff[request[1] + 1] -= 1;
        }
        int[] freq = new int[n];
        int running = 0;
        for (int i = 0; i < n; ++i) {
            running += diff[i];
            freq[i] = running;
        }
        int[] sortedNums = nums.clone();
        Arrays.sort(sortedNums);
        Arrays.sort(freq);
        // Both arrays are ascending after sort; pair largest with largest by
        // walking from the end — the rearrangement inequality makes that
        // pairing optimal.
        long total = 0;
        for (int i = 0; i < n; ++i) {
            total += (long) sortedNums[n - 1 - i] * freq[n - 1 - i];
        }
        return (int) (total % MOD);
    }
}
