import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class MajorityChecker {

    // A segment tree whose nodes carry the Boyer-Moore candidate of their
    // range (children folded left-to-right); a query surfaces the only value
    // that could possibly reach the threshold, which per-value sorted
    // position lists then verify with two binary searches.
    private final int n;
    private final int[] candidateOf;
    private final int[] surplusOf;
    private final Map<Integer, List<Integer>> positions = new HashMap<>();

    public MajorityChecker(int[] arr) {
        this.n = arr.length;
        this.candidateOf = new int[4 * n];
        this.surplusOf = new int[4 * n];
        build(1, 0, n - 1, arr);
        for (int i = 0; i < n; i++) {
            positions.computeIfAbsent(arr[i], value -> new ArrayList<>()).add(i);
        }
    }

    private void build(int node, int lo, int hi, int[] arr) {
        if (lo == hi) {
            candidateOf[node] = arr[lo];
            surplusOf[node] = 1;
            return;
        }
        int mid = (lo + hi) >>> 1;
        build(2 * node, lo, mid, arr);
        build(2 * node + 1, mid + 1, hi, arr);
        int[] merged = merge(
            candidateOf[2 * node],
            surplusOf[2 * node],
            candidateOf[2 * node + 1],
            surplusOf[2 * node + 1]
        );
        candidateOf[node] = merged[0];
        surplusOf[node] = merged[1];
    }

    private static int[] merge(int leftValue, int leftVotes, int rightValue, int rightVotes) {
        if (leftValue == rightValue) {
            return new int[] { leftValue, leftVotes + rightVotes };
        }
        if (leftVotes > rightVotes) {
            return new int[] { leftValue, leftVotes - rightVotes };
        }
        if (rightVotes > leftVotes) {
            return new int[] { rightValue, rightVotes - leftVotes };
        }
        return new int[] { 0, 0 }; // perfect tie: 0 is never an arr value
    }

    public int query(int left, int right, int threshold) {
        int candidate = fold(1, 0, n - 1, left, right)[0];
        List<Integer> occurrences = positions.get(candidate);
        if (occurrences == null) {
            return -1;
        }
        int count = lowerBound(occurrences, right + 1) - lowerBound(occurrences, left);
        return count >= threshold ? candidate : -1;
    }

    private int[] fold(int node, int lo, int hi, int left, int right) {
        if (left <= lo && hi <= right) {
            return new int[] { candidateOf[node], surplusOf[node] };
        }
        int mid = (lo + hi) >>> 1;
        if (right <= mid) {
            return fold(2 * node, lo, mid, left, right);
        }
        if (left > mid) {
            return fold(2 * node + 1, mid + 1, hi, left, right);
        }
        int[] leftFold = fold(2 * node, lo, mid, left, right);
        int[] rightFold = fold(2 * node + 1, mid + 1, hi, left, right);
        return merge(leftFold[0], leftFold[1], rightFold[0], rightFold[1]);
    }

    private static int lowerBound(List<Integer> list, int target) {
        int lo = 0,
            hi = list.size();
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (list.get(mid) < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
