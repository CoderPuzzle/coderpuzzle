import java.util.*;

class Solution {

    public int[] maximumMEX(int[] a) {
        int n = a.length,
            f[] = new int[n + 1];
        for (int x : a) if (x <= n) f[x]++;
        int mex = 0;
        while (f[mex] > 0) mex++;
        int[] tmp = new int[n];
        int z = 0,
            i = 0;
        while (i < n) {
            tmp[z++] = mex;
            if (mex == 0) {
                if (a[i] <= n) f[a[i]]--;
                i++;
                continue;
            }
            boolean[] seen = new boolean[mex];
            int miss = mex,
                next = mex;
            while (miss > 0) {
                int x = a[i++];
                if (x <= n && --f[x] == 0 && x < next) next = x;
                if (x < mex && !seen[x]) {
                    seen[x] = true;
                    miss--;
                }
            }
            mex = next;
        }
        return Arrays.copyOf(tmp, z);
    }
}
