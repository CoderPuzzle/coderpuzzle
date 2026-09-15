// Division is unavailable: 12345 = 3 * 5 * 823 is composite and grid values
// routinely share factors with it, so there is no modular inverse to divide
// by. Flatten the matrix in row-major order — excluding grid[i][j] is
// excluding one position of that sequence — and multiply the prefix
// (everything before the position) by the suffix (everything after it).
// Every factor is reduced below 12345 first, so each intermediate product
// stays below 12345^2 and fits in i32.
impl Solution {
    pub fn construct_product_matrix(grid: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        const MOD: i32 = 12345;
        let n = grid.len();
        let m = grid[0].len();
        let flat: Vec<i32> = grid.iter().flat_map(|row| row.iter().map(|v| v % MOD)).collect();
        let total = flat.len();
        let mut prefix = vec![1; total + 1];
        let mut suffix = vec![1; total + 1];
        for t in 0..total {
            prefix[t + 1] = prefix[t] * flat[t] % MOD;
            suffix[total - 1 - t] = suffix[total - t] * flat[total - 1 - t] % MOD;
        }
        let mut result = vec![vec![0; m]; n];
        let mut k = 0;
        for i in 0..n {
            for j in 0..m {
                result[i][j] = prefix[k] * suffix[k + 1] % MOD;
                k += 1;
            }
        }
        result
    }
}
