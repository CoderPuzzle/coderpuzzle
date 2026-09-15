impl Solution {
    // Sorted lexicographically by start point, a car only gains coverage
    // past the rightmost point counted so far — add its uncovered suffix
    // there and extend that reach.
    pub fn number_of_points(mut nums: Vec<Vec<i32>>) -> i32 {
        nums.sort();
        let mut total = 0;
        let mut reach = 0;
        for car in &nums {
            let start = car[0];
            let end = car[1];
            if end > reach {
                total += end - start.max(reach + 1) + 1;
                reach = end;
            }
        }
        total
    }
}
