impl Solution {
    pub fn longest_obstacle_course_at_each_position(obstacles: Vec<i32>) -> Vec<i32> {
        // tails[j] = smallest possible tail of a non-decreasing subsequence
        // of length j+1 over the prefix so far; it stays sorted, so each
        // obstacle is placed by binary search.
        let mut tails: Vec<i32> = Vec::with_capacity(obstacles.len());
        let mut ans: Vec<i32> = Vec::with_capacity(obstacles.len());
        for &x in &obstacles {
            // partition_point counts tails <= x, i.e. finds the first
            // strictly greater tail: an obstacle equal to a tail extends
            // that course instead of replacing it -- the only change vs
            // strict LIS.
            let i = tails.partition_point(|&t| t <= x);
            if i == tails.len() {
                tails.push(x); // new longest course
            } else {
                tails[i] = x; // keep the length-(i+1) tail minimal
            }
            // Insertion index + 1 = longest course ending with this obstacle.
            ans.push(i as i32 + 1);
        }
        ans
    }
}
