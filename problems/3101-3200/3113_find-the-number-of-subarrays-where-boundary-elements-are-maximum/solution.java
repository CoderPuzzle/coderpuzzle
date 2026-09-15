import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long numberOfSubarrays(int[] nums) {
        int n = nums.length;
        // leftGreater[i]: nearest index to the left with a strictly greater value
        int[] leftGreater = new int[n];
        int[] stack = new int[n];
        int top = 0;
        for (int i = 0; i < n; i++) {
            int x = nums[i];
            // values <= x can never be the nearest greater for a later element
            while (top > 0 && nums[stack[top - 1]] <= x) {
                top--;
            }
            leftGreater[i] = top > 0 ? stack[top - 1] : -1;
            stack[top++] = i;
        }

        // earlier positions of each value, always appended in increasing order
        Map<Integer, List<Integer>> positions = new HashMap<>();
        long ans = 0;
        for (int i = 0; i < n; i++) {
            int x = nums[i];
            List<Integer> lst = positions.computeIfAbsent(x, k -> new ArrayList<>());
            // hand-rolled bisect_right: first position beyond leftGreater[i]
            int lo = 0,
                hi = lst.size();
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (lst.get(mid) <= leftGreater[i]) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            // equal-value starts beyond leftGreater[i], plus the singleton [i..i]
            long count = 1L + lst.size() - lo;
            ans += count;
            lst.add(i);
        }
        return ans;
    }
}
