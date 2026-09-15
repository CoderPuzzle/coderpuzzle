import java.util.HashMap;
import java.util.Map;

class Solution {

    private static class SegTree {

        private final int[] mn, mx, lazy;
        private final int n;

        SegTree(int[] values) {
            n = values.length;
            mn = new int[4 * n];
            mx = new int[4 * n];
            lazy = new int[4 * n];
            build(1, 0, n - 1, values);
        }

        private void build(int node, int nl, int nr, int[] values) {
            if (nl == nr) {
                mn[node] = mx[node] = values[nl];
                return;
            }
            int mid = (nl + nr) / 2;
            build(node * 2, nl, mid, values);
            build(node * 2 + 1, mid + 1, nr, values);
            mn[node] = Math.min(mn[node * 2], mn[node * 2 + 1]);
            mx[node] = Math.max(mx[node * 2], mx[node * 2 + 1]);
        }

        private void push(int node) {
            int z = lazy[node];
            if (z != 0) {
                mn[node * 2] += z;
                mx[node * 2] += z;
                lazy[node * 2] += z;
                mn[node * 2 + 1] += z;
                mx[node * 2 + 1] += z;
                lazy[node * 2 + 1] += z;
                lazy[node] = 0;
            }
        }

        void addRange(int ql, int qr, int delta) {
            add(1, 0, n - 1, ql, qr, delta);
        }

        private void add(int node, int nl, int nr, int ql, int qr, int delta) {
            if (ql <= nl && nr <= qr) {
                mn[node] += delta;
                mx[node] += delta;
                lazy[node] += delta;
                return;
            }
            push(node);
            int mid = (nl + nr) / 2;
            if (ql <= mid) {
                add(node * 2, nl, mid, ql, qr, delta);
            }
            if (qr > mid) {
                add(node * 2 + 1, mid + 1, nr, ql, qr, delta);
            }
            mn[node] = Math.min(mn[node * 2], mn[node * 2 + 1]);
            mx[node] = Math.max(mx[node * 2], mx[node * 2 + 1]);
        }

        int rightmostZero(int ql, int qr) {
            return rightmost(1, 0, n - 1, ql, qr);
        }

        private int rightmost(int node, int nl, int nr, int ql, int qr) {
            if (qr < nl || nr < ql) {
                return -1;
            }
            if (ql <= nl && nr <= qr) {
                if (mn[node] > 0 || mx[node] < 0) {
                    return -1;
                }
                if (nl == nr) {
                    return nl;
                }
                push(node);
                int mid = (nl + nr) / 2;
                int res = rightmost(node * 2 + 1, mid + 1, nr, ql, qr);
                if (res != -1) {
                    return res;
                }
                return rightmost(node * 2, nl, mid, ql, qr);
            }
            push(node);
            int mid = (nl + nr) / 2;
            int res = rightmost(node * 2 + 1, mid + 1, nr, ql, qr);
            if (res != -1) {
                return res;
            }
            return rightmost(node * 2, nl, mid, ql, qr);
        }
    }

    public int longestBalanced(int[] nums) {
        int n = nums.length;
        // first occurrence of each value (seeds balance(0, r)) and the next
        // occurrence of each position (tells where a value stops mattering).
        Map<Integer, Integer> first = new HashMap<>();
        int[] nxt = new int[n];
        Map<Integer, Integer> last = new HashMap<>();
        for (int i = n - 1; i >= 0; i--) {
            int v = nums[i];
            nxt[i] = last.getOrDefault(v, n);
            last.put(v, i);
        }
        for (int i = 0; i < n; i++) {
            if (!first.containsKey(nums[i])) {
                first.put(nums[i], i);
            }
        }
        // Seed balance(0, r): each value contributes its sign to every right
        // end at or after its first occurrence, via O(log n) range adds.
        SegTree tree = new SegTree(new int[n]);
        for (Map.Entry<Integer, Integer> entry : first.entrySet()) {
            int v = entry.getKey(),
                p = entry.getValue();
            tree.addRange(p, n - 1, (v & 1) == 1 ? 1 : -1);
        }
        int best = 0;
        for (int l = 0; l < n; l++) {
            int r = tree.rightmostZero(l, n - 1);
            if (r != -1) {
                best = Math.max(best, r - l + 1);
            }
            int v = nums[l];
            int s = (v & 1) == 1 ? 1 : -1;
            if (nxt[l] > l) {
                tree.addRange(l, nxt[l] - 1, -s);
            }
        }
        return best;
    }
}
