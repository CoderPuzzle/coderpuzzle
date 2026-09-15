class Solution {

    public int minOperations(String s, int k) {
        int n = s.length();
        int z = 0;
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '0') {
                z++;
            }
        }
        // Only the count z of zeros matters: an operation flips i of the
        // current zeros and k - i of the ones, moving z to z + k - 2 * i
        // for any legal i — one contiguous same-parity range per step.
        if (z == 0) {
            return 0;
        }
        // BFS over zero counts 0..n toward 0. Two skip lists (one per
        // parity) hold the unvisited states, so each state enters the
        // queue exactly once even though edges are whole intervals.
        int[] nextEven = new int[n / 2 + 2];
        int[] nextOdd = new int[(n + 1) / 2 + 1];
        for (int i = 0; i < nextEven.length; i++) {
            nextEven[i] = i;
        }
        for (int i = 0; i < nextOdd.length; i++) {
            nextOdd[i] = i;
        }
        int[] dist = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            dist[i] = -1;
        }
        int[] queue = new int[n + 1];
        int tail = 0;
        dist[z] = 0;
        queue[tail++] = z;
        int start = z >> 1;
        if (z % 2 == 0) {
            nextEven[start] = start + 1;
        } else {
            nextOdd[start] = start + 1;
        }
        for (int head = 0; head < tail; head++) {
            int cur = queue[head];
            int lo = Math.max(0, k - (n - cur));
            int hi = Math.min(k, cur);
            int low = cur + k - 2 * hi;
            int high = cur + k - 2 * lo;
            int p = (cur + k) & 1;
            int[] nxt = p == 0 ? nextEven : nextOdd;
            int d = dist[cur] + 1;
            int j = find(nxt, low >> 1);
            while (j < nxt.length - 1) {
                int v = 2 * j + p;
                if (v > high) {
                    break;
                }
                dist[v] = d;
                if (v == 0) {
                    return d;
                }
                nxt[j] = j + 1;
                queue[tail++] = v;
                j = find(nxt, j + 1);
            }
        }
        return -1;
    }

    private int find(int[] nxt, int i) {
        // Next unvisited slot at or after i; path-compresses on the way.
        int root = i;
        while (nxt[root] != root) {
            root = nxt[root];
        }
        while (nxt[i] != root) {
            int up = nxt[i];
            nxt[i] = root;
            i = up;
        }
        return root;
    }
}
