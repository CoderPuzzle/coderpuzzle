class Solution {
  public:
    long long coloredCells(int n) {
        // The blue region after minute n is a diamond of Chebyshev
        // radius n-1 around the first cell: ring k adds 4*k cells, so
        // the total is 1 + 4*(0+1+...+(n-1)) = 2n^2 - 2n + 1. The
        // product needs long long: at n = 10^5 it reaches ~2*10^10,
        // beyond what a 32-bit int can hold.
        return 2LL * n * n - 2LL * n + 1;
    }
};
