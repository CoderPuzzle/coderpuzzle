import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int minimumDifference(int[] nums) {
        int half = nums.length / 2;

        List<List<Integer>> A = subsetSumsByCount(nums, 0, half);
        List<List<Integer>> B = subsetSumsByCount(nums, half, nums.length);

        long total = 0;
        for (int v : nums) {
            total += v;
        }

        // If the first half contributes c elements with sum a, the second half
        // must contribute exactly half-c elements with sum b — both sides then
        // have `half` elements and difference |total - 2(a+b)|.
        long ans = Long.MAX_VALUE;
        for (int c = 0; c <= half; c++) {
            List<Integer> Bc = new ArrayList<>(B.get(half - c));
            Collections.sort(Bc);
            for (long a : A.get(c)) {
                // b >= total/2 - a  <=>  2*b >= total - 2*a (exact integers)
                long want = total - 2 * a;
                int lo = 0,
                    hi = Bc.size();
                while (lo < hi) {
                    int mid = (lo + hi) >>> 1;
                    if (2L * Bc.get(mid) < want) {
                        lo = mid + 1;
                    } else {
                        hi = mid;
                    }
                }
                // The closest b sits on one side of the insertion point — try both.
                int idx = lo;
                if (idx < Bc.size()) {
                    long d = Math.abs(total - 2 * (a + Bc.get(idx)));
                    if (d < ans) {
                        ans = d;
                    }
                }
                if (idx > 0) {
                    long d = Math.abs(total - 2 * (a + Bc.get(idx - 1)));
                    if (d < ans) {
                        ans = d;
                    }
                }
            }
        }
        return (int) ans;
    }

    // Bucket each half's subset sums by how many elements produced them;
    // a half of length <= 15 keeps this at most 2^15 entries.
    private List<List<Integer>> subsetSumsByCount(int[] arr, int from, int to) {
        int m = to - from;
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i <= m; i++) {
            res.add(new ArrayList<>());
        }
        for (int mask = 0; mask < 1 << m; mask++) {
            int cnt = Integer.bitCount(mask);
            int total = 0;
            for (int i = 0; i < m; i++) {
                if (((mask >> i) & 1) != 0) {
                    total += arr[from + i];
                }
            }
            res.get(cnt).add(total);
        }
        return res;
    }
}
