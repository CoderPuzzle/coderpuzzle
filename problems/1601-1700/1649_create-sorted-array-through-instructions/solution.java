class Solution {

    public int createSortedArray(int[] instructions) {
        final long MOD = 1_000_000_007L;
        int m = 0;
        for (int x : instructions) {
            if (x > m) {
                m = x;
            }
        }
        // Fenwick tree indexed by value: prefix counts with point updates.
        long[] tree = new long[m + 1];

        long total = 0;
        long count = 0;
        for (int x : instructions) {
            // Inserting x costs the smaller of: elements strictly below x
            // (query(x-1)) and strictly above (count - query(x), since
            // query(x) includes equals — equals land in neither bucket).
            long less = query(tree, x - 1);
            long greater = count - query(tree, x);
            total = (total + Math.min(less, greater)) % MOD;
            update(tree, x, m);
            count += 1;
        }
        return (int) total;
    }

    // Climb the lowbit ladder to add one occurrence of value i.
    private void update(long[] tree, int i, int m) {
        while (i <= m) {
            tree[i] += 1;
            i += i & -i;
        }
    }

    // Sum of occurrences of values 1..i.
    private long query(long[] tree, int i) {
        long s = 0;
        while (i > 0) {
            s += tree[i];
            i -= i & -i;
        }
        return s;
    }
}
