// Columns are independent: a cell only has to top the cell directly above
// it, so one top-to-bottom sweep settles everything. Raising each cell to
// exactly one above the cell above is the pointwise minimum final column,
// so no cheaper fix exists.
impl Solution {
    pub fn minimum_operations(grid: Vec<Vec<i32>>) -> i32 {
        let mut previous = grid[0].clone();
        let mut operations = 0;
        for row in &grid[1..] {
            for (j, &value) in row.iter().enumerate() {
                if value <= previous[j] {
                    operations += previous[j] + 1 - value;
                    previous[j] += 1;
                } else {
                    previous[j] = value;
                }
            }
        }
        operations
    }
}
