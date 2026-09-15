import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long[] avoidFlood(long[] rains) {
        int n = rains.length;
        List<Integer> zeros = new ArrayList<>();
        Map<Long, Integer> last = new HashMap<>();
        long[] ans = new long[n];
        for (int i = 0; i < n; i++) {
            ans[i] = -1;
        }
        for (int i = 0; i < n; i++) {
            long r = rains[i];
            if (r == 0) {
                ans[i] = 1;
                zeros.add(i);
            } else if (last.containsKey(r)) {
                int prev = last.get(r);
                int lo = 0,
                    hi = zeros.size();
                while (lo < hi) {
                    int mid = (lo + hi) >>> 1;
                    if (zeros.get(mid) <= prev) {
                        lo = mid + 1;
                    } else {
                        hi = mid;
                    }
                }
                if (lo == zeros.size() || zeros.get(lo) >= i) {
                    return new long[0];
                }
                ans[zeros.remove(lo)] = r;
                last.put(r, i);
            } else {
                last.put(r, i);
            }
        }
        return ans;
    }
}
