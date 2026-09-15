import java.util.*;

class Solution {

    // Apply next-permutation k times to get the target digits, then the
    // minimum adjacent swaps to rearrange num into it is the inversion
    // count of the order-preserving digit matching.
    public int getMinSwaps(String num, int k) {
        int n = num.length();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = num.charAt(i) - '0';
        }
        for (int t = 0; t < k; t++) {
            nextPermutation(arr);
        }
        // match each target digit to the earliest unused equal digit of num
        ArrayDeque<Integer>[] slots = new ArrayDeque[10];
        for (int d = 0; d < 10; d++) {
            slots[d] = new ArrayDeque<>();
        }
        for (int i = 0; i < n; i++) {
            slots[num.charAt(i) - '0'].add(i);
        }
        long[] perm = new long[n];
        for (int i = 0; i < n; i++) {
            perm[i] = slots[arr[i]].pollFirst();
        }

        // inversion count via a BIT over original indices
        long[] tree = new long[n + 1];
        long inv = 0;
        for (int i = 0; i < n; i++) {
            int idx = (int) perm[i];
            long lessEq = 0;
            for (int x = idx; x > 0; x -= x & -x) {
                lessEq += tree[x];
            }
            inv += i - lessEq;
            for (int x = idx + 1; x <= n; x += x & -x) {
                tree[x]++;
            }
        }
        return (int) inv;
    }

    private void nextPermutation(int[] a) {
        int n = a.length,
            i = n - 2;
        while (i >= 0 && a[i] >= a[i + 1]) {
            i--;
        }
        int j = n - 1;
        while (a[j] <= a[i]) {
            j--;
        }
        int t = a[i];
        a[i] = a[j];
        a[j] = t;
        for (int l = i + 1, r = n - 1; l < r; l++, r--) {
            t = a[l];
            a[l] = a[r];
            a[r] = t;
        }
    }
}
