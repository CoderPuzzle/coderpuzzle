class Solution {

    public int[] duplicateZeros(int[] arr) {
        // Two-pointer write from the end: every element is written to a
        // position at or to the right of its source, so no unread value is
        // ever overwritten. i reads the original array, j writes into the
        // extended one; writes with j beyond the real length fall off.
        int n = arr.length;
        int zeros = 0;
        for (int v : arr) if (v == 0) zeros++;
        int i = n - 1;
        int j = n + zeros - 1;
        while (i >= 0) {
            if (j < n) arr[j] = arr[i];
            j--;
            if (arr[i] == 0) {
                if (j < n) arr[j] = 0;
                j--;
            }
            i--;
        }
        return arr;
    }
}
