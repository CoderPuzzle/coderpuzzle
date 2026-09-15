import java.util.ArrayList;
import java.util.List;

class Solution {

    public int lengthOfLIS(int[] nums) {
        // tails[k] = smallest value ending an increasing subsequence of
        // length k+1; it stays sorted, which licenses the binary search.
        List<Integer> tails = new ArrayList<>();
        for (int x : nums) {
            // Lower bound: first tail >= x. An equal value lands on its
            // own tail, which enforces strict increase.
            int lo = 0,
                hi = tails.size();
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (tails.get(mid) < x) lo = mid + 1;
                else hi = mid;
            }
            // Past the end: x beats every tail, so extend by one;
            // otherwise replace — same length, cheaper ending.
            if (lo == tails.size()) tails.add(x);
            else tails.set(lo, x);
        }
        // tails itself need not be a real subsequence; only its length is.
        return tails.size();
    }
}
