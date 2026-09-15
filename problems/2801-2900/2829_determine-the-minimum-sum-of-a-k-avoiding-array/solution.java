class Solution {

    public int minimumSum(int n, int k) {
        // Every term is bounded by roughly n * k <= 2500, so int arithmetic never overflows.
        int below = Math.min(n, k / 2);
        int above = n - below;
        return (below * (below + 1)) / 2 + above * k + (above * (above - 1)) / 2;
    }
}
