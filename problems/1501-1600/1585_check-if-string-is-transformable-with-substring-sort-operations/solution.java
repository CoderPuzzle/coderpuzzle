import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    // 1-indexed Fenwick tree over the n original positions of s, tracking
    // which positions of one particular digit are still unconsumed.
    private static final class FenwickTree {

        private final int size;
        private final int[] tree;

        FenwickTree(int size) {
            this.size = size;
            this.tree = new int[size + 1];
        }

        void add(int index, int delta) {
            index += 1;
            while (index <= size) {
                tree[index] += delta;
                index += index & -index;
            }
        }

        int prefixCount(int index) {
            int total = 0;
            while (index > 0) {
                total += tree[index];
                index -= index & -index;
            }
            return total;
        }
    }

    public boolean isTransformable(String s, String t) {
        int n = s.length();
        if (t.length() != n) return false;

        // queue[d]: original positions in s carrying digit d, oldest first.
        Deque<Integer>[] queue = new ArrayDeque[10];
        for (int d = 0; d < 10; d++) queue[d] = new ArrayDeque<>();
        for (int index = 0; index < n; index++) {
            queue[s.charAt(index) - '0'].addLast(index);
        }

        // fenwick[d] marks which occurrences of digit d are still
        // unconsumed, so a prefix query answers "how many remaining
        // digit-d positions sit left of index x".
        FenwickTree[] fenwick = new FenwickTree[10];
        for (int d = 0; d < 10; d++) fenwick[d] = new FenwickTree(n);
        for (int index = 0; index < n; index++) {
            fenwick[s.charAt(index) - '0'].add(index, 1);
        }

        for (int i = 0; i < n; i++) {
            int digit = t.charAt(i) - '0';
            if (queue[digit].isEmpty()) return false;
            int pos = queue[digit].pollFirst();
            // any remaining strictly-smaller digit still left of pos
            // permanently blocks it: sorting only lets pos move left past
            // digits strictly greater than it, never past a smaller one.
            int blocked = 0;
            for (int smaller = 0; smaller < digit; smaller++) {
                blocked += fenwick[smaller].prefixCount(pos);
            }
            if (blocked != 0) return false;
            fenwick[digit].add(pos, -1);
        }

        return true;
    }
}
