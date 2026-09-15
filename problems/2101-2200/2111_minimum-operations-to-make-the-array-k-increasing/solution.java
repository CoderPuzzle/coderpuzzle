import java.util.ArrayList;
import java.util.List;

class Solution {

    public int kIncreasing(int[] arr, int k) {
        int operations = 0;
        // arr[i-k] <= arr[i] only relates indices congruent mod k, so each
        // residue class is an independent subsequence.
        for (int start = 0; start < k; start++) {
            List<Integer> sub = new ArrayList<>();
            for (int i = start; i < arr.length; i += k) {
                sub.add(arr[i]);
            }
            // Keep the LNDS unchanged and rewrite everything else; values
            // are free, so any kept subsequence can be completed.
            operations += sub.size() - longestNondecreasing(sub);
        }
        return operations;
    }

    private int longestNondecreasing(List<Integer> seq) {
        // Patience trick: tails[l] is the smallest possible tail of a
        // non-decreasing subsequence of length l+1.
        List<Integer> tails = new ArrayList<>();
        for (int value : seq) {
            // Search for the first tail strictly greater than value — equal
            // elements extend the subsequence instead of replacing, which is
            // what makes it non-decreasing.
            int lo = 0;
            int hi = tails.size();
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (tails.get(mid) <= value) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            if (lo == tails.size()) {
                tails.add(value);
            } else {
                tails.set(lo, value);
            }
        }
        return tails.size();
    }
}
