class Solution {

    public int findKthNumber(int n, int k) {
        // Lexicographic order = preorder walk of the denary tree (children
        // append digits 0-9); kk becomes a zero-based count of nodes to skip.
        long cur = 1;
        long kk = k - 1;
        while (kk > 0) {
            long steps = countSteps(n, cur, cur + 1);
            // Whole subtree between cur and cur+1 fits the budget: skip it
            // and move to the next sibling; otherwise descend past cur.
            if (steps <= kk) {
                cur += 1;
                kk -= steps;
            } else {
                cur *= 10;
                kk -= 1;
            }
        }
        return (int) cur;
    }

    // Size of the subtree rooted at prefix n1: numbers in [1, n] lying in
    // [n1, n2). One level at a time, [n1, n2) covers every number sharing
    // the prefix at that depth, so clamp the right edge past n and scale
    // both bounds by ten for the next level.
    private long countSteps(long n, long n1, long n2) {
        long steps = 0;
        while (n1 <= n) {
            steps += Math.min(n + 1, n2) - n1;
            n1 *= 10;
            n2 *= 10;
        }
        return steps;
    }
}
