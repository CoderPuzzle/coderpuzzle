class Solution {

    public long maxCount(int m, int n, int[][] ops) {
        // Every operation covers the prefix rectangle anchored at the top-left
        // corner, so the cells incremented by all of them form the rectangle
        // sized by the smallest a and the smallest b; only those cells can
        // hold the maximum. Starting both minima at m and n covers empty ops,
        // where every cell stays 0 and all m*n cells are maximal.
        int minA = m,
            minB = n;
        for (int[] op : ops) {
            if (op[0] < minA) {
                minA = op[0];
            }
            if (op[1] < minB) {
                minB = op[1];
            }
        }
        return (long) minA * minB;
    }
}
