import java.util.Arrays;

class Solution {

    private int[] vals;
    private int[] leftChild;
    private int[] rightChild;
    private int[] nodeCount;
    private long[] nodeSum;
    private int used = 1;

    public long[] minOperations(int[] nums, int k, int[][] queries) {
        int n = nums.length;
        // Remainder runs: a window is equalizable iff it sits inside one
        // maximal run of equal remainders, i.e. iff l and r share a mark.
        int[] run = new int[n];
        for (int i = 1; i < n; i++) {
            run[i] = run[i - 1] + (nums[i] % k != nums[i - 1] % k ? 1 : 0);
        }
        int[] quotients = new int[n];
        for (int i = 0; i < n; i++) {
            quotients[i] = nums[i] / k;
        }
        // Persistent segment tree over the compressed quotients: version i
        // counts the occurrences among nums[0..i-1], so the window [l, r]
        // is version r + 1 minus version l. Node 0 is the empty version.
        vals = quotients.clone();
        Arrays.sort(vals);
        int m = 0;
        for (int i = 0; i < vals.length; i++) {
            if (i == 0 || vals[i] != vals[i - 1]) {
                vals[m++] = vals[i];
            }
        }
        int capacity = 20 * n + 10;
        leftChild = new int[capacity];
        rightChild = new int[capacity];
        nodeCount = new int[capacity];
        nodeSum = new long[capacity];
        int[] roots = new int[n + 1];
        for (int i = 0; i < n; i++) {
            int pos = Arrays.binarySearch(vals, 0, m, quotients[i]);
            roots[i + 1] = insert(roots[i], 0, m - 1, pos, quotients[i]);
        }
        long[] result = new long[queries.length];
        for (int qi = 0; qi < queries.length; qi++) {
            int l = queries[qi][0],
                r = queries[qi][1];
            if (run[l] != run[r]) {
                result[qi] = -1;
                continue;
            }
            int a = roots[l],
                b = roots[r + 1];
            long windowSum = nodeSum[b] - nodeSum[a];
            long size = r - l + 1L;
            long need = (size + 1) / 2;
            long belowCount = 0,
                belowSum = 0;
            int lo = 0,
                hi = m - 1;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                int leftCount = nodeCount[leftChild[b]] - nodeCount[leftChild[a]];
                if (need <= leftCount) {
                    a = leftChild[a];
                    b = leftChild[b];
                    hi = mid;
                } else {
                    need -= leftCount;
                    belowCount += leftCount;
                    belowSum += nodeSum[leftChild[b]] - nodeSum[leftChild[a]];
                    a = rightChild[a];
                    b = rightChild[b];
                    lo = mid + 1;
                }
            }
            long median = vals[lo];
            // Below-median elements climb by their shortfall; elements at or
            // above descend by their excess; equals contribute nothing.
            result[qi] = median * belowCount - belowSum + (windowSum - belowSum - median * (size - belowCount));
        }
        return result;
    }

    // Copies one node of the previous version: the count climbs by one and
    // the node's value sum by the inserted quotient.
    private int newNode(int prev, int value) {
        int node = used++;
        leftChild[node] = leftChild[prev];
        rightChild[node] = rightChild[prev];
        nodeCount[node] = nodeCount[prev] + 1;
        nodeSum[node] = nodeSum[prev] + value;
        return node;
    }

    // Path-copies one root-to-leaf route for the new version.
    private int insert(int prev, int lo, int hi, int pos, int value) {
        int node = newNode(prev, value);
        if (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (pos <= mid) {
                leftChild[node] = insert(leftChild[prev], lo, mid, pos, value);
            } else {
                rightChild[node] = insert(rightChild[prev], mid + 1, hi, pos, value);
            }
        }
        return node;
    }
}
