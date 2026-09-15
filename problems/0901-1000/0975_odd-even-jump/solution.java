import java.util.Arrays;

class Solution {

    public int oddEvenJumps(int[] arr) {
        // The jump out of every index is forced: an odd jump lands on the
        // smallest value >= arr[i] to the right, an even jump on the largest
        // value <= arr[i], and ties go to the smallest index. Build both
        // jump tables with one sort and one stack each: walk the indices
        // ordered by (value, index) — by (negated value, index) for the
        // even table — and each newcomer resolves every still-open index
        // standing to its left, because the first walker with a larger
        // original index is exactly the forced target. Then sweep from the
        // right: odd_ok[i] holds when the odd target's even_ok holds,
        // even_ok[i] when the even target's odd_ok holds, the last index is
        // good under both with zero jumps, and the answer counts the
        // odd_ok starts — every good start opens with an odd jump.
        int n = arr.length;
        int[] higher = jumpTable(arr, false);
        int[] lower = jumpTable(arr, true);
        boolean[] oddOk = new boolean[n];
        boolean[] evenOk = new boolean[n];
        oddOk[n - 1] = true;
        evenOk[n - 1] = true;
        int count = 1;
        for (int i = n - 2; i >= 0; --i) {
            int j = higher[i];
            if (j != -1 && evenOk[j]) {
                oddOk[i] = true;
            }
            j = lower[i];
            if (j != -1 && oddOk[j]) {
                evenOk[i] = true;
            }
            if (oddOk[i]) {
                ++count;
            }
        }
        return count;
    }

    // Stack of indices still waiting for their forced target; the first
    // walker standing further right resolves each of them.
    private int[] jumpTable(int[] arr, boolean descending) {
        int n = arr.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; ++i) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> {
            if (arr[a] != arr[b]) {
                return descending ? Integer.compare(arr[b], arr[a]) : Integer.compare(arr[a], arr[b]);
            }
            return Integer.compare(a, b);
        });
        int[] table = new int[n];
        Arrays.fill(table, -1);
        int[] stack = new int[n];
        int top = 0;
        for (int j : order) {
            while (top > 0 && stack[top - 1] < j) {
                table[stack[--top]] = j;
            }
            stack[top++] = j;
        }
        return table;
    }
}
