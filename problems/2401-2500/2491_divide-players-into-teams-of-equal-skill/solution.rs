impl Solution {
    pub fn divide_players(skill: Vec<i32>) -> i64 {
        // The team total is fixed: the sum of all skills split evenly over
        // n / 2 teams. If the sum does not divide, no pairing can be even.
        // Otherwise the sorted array forces the weakest and strongest into
        // a team, which the two pointers check and price in one pass.
        let n = skill.len();
        let teams = n / 2;
        let total: i64 = skill.iter().map(|&s| i64::from(s)).sum();
        if total % teams as i64 != 0 {
            return -1;
        }
        let target = total / teams as i64;

        let mut arr = skill;
        arr.sort_unstable();
        let mut chemistry: i64 = 0;
        let (mut i, mut j) = (0, n - 1);
        while i < j {
            if i64::from(arr[i]) + i64::from(arr[j]) != target {
                return -1;
            }
            chemistry += i64::from(arr[i]) * i64::from(arr[j]);
            i += 1;
            j -= 1;
        }
        chemistry
    }
}
