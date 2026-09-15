impl Solution {
    pub fn maximum_groups(grades: Vec<i32>) -> i32 {
        let n = grades.len();
        let mut groups = 0_i64;
        while (groups + 1) * (groups + 2) / 2 <= n as i64 {
            groups += 1;
        }
        groups as i32
    }
}
