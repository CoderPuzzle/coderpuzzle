import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int sumSubarrayMins(int[] arr) {
        final int MOD = 1000000007;
        int n = arr.length;
        int[] left = new int[n];
        int[] right = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        // left[i]: index of the previous strictly smaller element (pops >=),
        // with -1 letting the dominance span reach the left border.
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
                stack.pop();
            }
            left[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(i);
        }
        stack = new ArrayDeque<>();
        // right[i]: next smaller-or-equal element (pops only >). The
        // asymmetry attributes tied minima to the leftmost position, so
        // no subarray is counted twice; n spans to the right border.
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
                stack.pop();
            }
            right[i] = stack.isEmpty() ? n : stack.peek();
            stack.push(i);
        }
        // arr[i] is the minimum exactly when the subarray's endpoints lie in
        // (left[i], i] x [i, right[i]) — that product counts them all.
        long total = 0;
        for (int i = 0; i < n; i++) {
            total += (long) arr[i] * (i - left[i]) * (right[i] - i);
        }
        return (int) (total % MOD);
    }
}
