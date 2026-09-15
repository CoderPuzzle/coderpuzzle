class Solution {

    public int[] pathInZigZagTree(int label) {
        // Walk up level by level using each node's position within its row.
        // The parent of the node at position p sits at position p / 2 in the
        // row above, in every row; only the label-to-position mapping flips
        // direction between rows. Fill the result from the back so the path
        // comes out root-first without a separate reverse.
        int level = 0;
        for (int v = label; v > 1; v >>= 1) ++level;
        int[] result = new int[level + 1];
        int cur = label;
        for (int i = level; i >= 0; --i) {
            result[i] = cur;
            if (i == 0) break;
            int low = 1 << i;
            int high = (1 << (i + 1)) - 1;
            int position = i % 2 == 0 ? cur - low : high - cur;
            int parentPosition = position / 2;
            low = 1 << (i - 1);
            high = (1 << i) - 1;
            cur = (i - 1) % 2 == 0 ? low + parentPosition : high - parentPosition;
        }
        return result;
    }
}
