import java.util.HashMap;
import java.util.Map;

class Solution {

    private int[] nxt;

    private int find(int x) {
        int root = x;
        while (nxt[root] != root) {
            root = nxt[root];
        }
        while (nxt[x] != root) {
            int step = nxt[x];
            nxt[x] = root;
            x = step;
        }
        return root;
    }

    public long[] avoidFlood(long[] rains) {
        int n = rains.length;
        nxt = new int[n + 2];
        for (int i = 0; i < nxt.length; i++) {
            nxt[i] = i;
        }
        Map<Long, Integer> last = new HashMap<>();
        long[] ans = new long[n];
        for (int i = 0; i < n; i++) {
            ans[i] = -1;
        }
        for (int i = 0; i < n; i++) {
            long r = rains[i];
            if (r == 0) {
                ans[i] = 1;
            } else {
                nxt[i] = i + 1;
                Integer prev = last.get(r);
                if (prev != null) {
                    int j = find(prev + 1);
                    if (j >= i) {
                        return new long[0];
                    }
                    ans[j] = r;
                    nxt[j] = j + 1;
                }
                last.put(r, i);
            }
        }
        return ans;
    }
}
