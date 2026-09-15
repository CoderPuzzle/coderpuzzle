impl Solution {
    pub fn colored_cells(n: i32) -> i64 {
        // The blue region after minute n is a diamond of Chebyshev
        // radius n-1 around the first cell: ring k adds 4*k cells, so
        // the total is 1 + 4*(0+1+...+(n-1)) = 2n^2 - 2n + 1. The
        // product needs i64: at n = 10^5 it reaches ~2*10^10, beyond
        // what i32 can hold.
        let n = n as i64;
        2 * n * n - 2 * n + 1
    }
}
