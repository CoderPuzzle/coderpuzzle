import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int totalSteps(int[] nums) {
        Deque<long[]> st = new ArrayDeque<>();
        long ans = 0;
        for (int x : nums) {
            long cur = 0;
            while (!st.isEmpty() && st.peekLast()[0] <= x) {
                long popped = st.pollLast()[1];
                if (popped > cur) cur = popped;
            }
            if (!st.isEmpty()) cur += 1;
            else cur = 0;
            st.addLast(new long[] { x, cur });
            if (cur > ans) ans = cur;
        }
        return (int) ans;
    }
}
