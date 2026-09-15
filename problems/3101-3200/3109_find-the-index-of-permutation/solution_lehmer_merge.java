import java.util.Arrays;

class Solution {

    public int getPermutationIndex(int[] perm) {
        final long MOD = 1_000_000_007L;
        int n = perm.length;
        // fact[i] = i!; position i's Lehmer digit weighs (n - 1 - i)!
        long[] fact = new long[n];
        fact[0] = 1;
        for (int i = 1; i < n; i++) {
            fact[i] = (fact[i - 1] * i) % MOD;
        }

        // Lehmer digit re-read: the values still unused at slot i are exactly
        // the values in later slots, so digit i counts later slots holding
        // smaller values -- a per-position smaller-to-the-right inversion count.
        long[] smallerAfter = new long[n];
        // merge-sort workspace of (value, original index) pairs, sorted by value
        int[] orderVal = new int[n];
        int[] orderIdx = new int[n];
        for (int i = 0; i < n; i++) {
            orderVal[i] = perm[i];
            orderIdx[i] = i;
        }
        mergeSort(orderVal, orderIdx, smallerAfter, 0, n);

        long ans = 0;
        for (int i = 0; i < n; i++) {
            // each later smaller value placed at slot i leads (n - 1 - i)! earlier permutations
            ans = (ans + (smallerAfter[i] % MOD) * fact[n - 1 - i]) % MOD;
        }
        return (int) ans;
    }

    private void mergeSort(int[] orderVal, int[] orderIdx, long[] smallerAfter, int lo, int hi) {
        if (hi - lo < 2) {
            return;
        }
        int mid = (lo + hi) / 2;
        mergeSort(orderVal, orderIdx, smallerAfter, lo, mid);
        mergeSort(orderVal, orderIdx, smallerAfter, mid, hi);
        int[] leftVal = Arrays.copyOfRange(orderVal, lo, mid);
        int[] leftIdx = Arrays.copyOfRange(orderIdx, lo, mid);
        int i = 0,
            j = mid,
            k = lo;
        while (i < leftVal.length && j < hi) {
            if (leftVal[i] < orderVal[j]) {
                smallerAfter[leftIdx[i]] += j - mid; // right-half values already placed below it
                orderVal[k] = leftVal[i];
                orderIdx[k] = leftIdx[i];
                i++;
            } else {
                orderVal[k] = orderVal[j];
                orderIdx[k] = orderIdx[j];
                j++;
            }
            k++;
        }
        while (i < leftVal.length) {
            smallerAfter[leftIdx[i]] += j - mid; // the whole right half sits below it
            orderVal[k] = leftVal[i];
            orderIdx[k] = leftIdx[i];
            i++;
            k++;
        }
    }
}
