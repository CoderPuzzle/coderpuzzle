import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    private int n;
    private int[] tree;

    private void update(int i, int delta) {
        for (; i <= n; i += i & -i) {
            tree[i] += delta;
        }
    }

    private int query(int i) {
        int total = 0;
        for (; i > 0; i -= i & -i) {
            total += tree[i];
        }
        return total;
    }

    public String minInteger(String num, int k) {
        n = num.length();
        // Fenwick tree over 1..n; tree[p] = 1 means the digit originally at
        // position p is still unplaced. Prefix sums answer "how many
        // unplaced digits sit before position p" in O(log n).
        tree = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            update(i, 1);
        }

        // Per-digit queues of remaining original (1-indexed) positions, in
        // increasing order, so the front is always the cheapest to reach.
        @SuppressWarnings("unchecked")
        Deque<Integer>[] positions = new ArrayDeque[10];
        for (int d = 0; d < 10; d++) {
            positions[d] = new ArrayDeque<>();
        }
        for (int i = 0; i < n; i++) {
            positions[num.charAt(i) - '0'].addLast(i + 1);
        }

        StringBuilder result = new StringBuilder();
        for (int step = 0; step < n; step++) {
            for (int d = 0; d < 10; d++) {
                if (positions[d].isEmpty()) {
                    continue;
                }
                int p = positions[d].peekFirst();
                // Cost to bring this digit to the front of the unplaced
                // suffix: one swap per still-active digit before it.
                int cost = query(p - 1);
                if (cost <= k) {
                    positions[d].pollFirst();
                    update(p, -1);
                    k -= cost;
                    result.append((char) ('0' + d));
                    break;
                }
            }
        }
        return result.toString();
    }
}
