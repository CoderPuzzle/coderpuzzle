impl Solution {
    pub fn count_good_integers_on_path(l: i64, r: i64, directions: String) -> i64 {
        let mut selected = [false; 16];
        let (mut row, mut column) = (0usize, 0usize);
        selected[0] = true;
        for movement in directions.bytes() {
            if movement == b'D' {
                row += 1;
            } else {
                column += 1;
            }
            selected[row * 4 + column] = true;
        }
        Self::count_up_to(r, &selected) - Self::count_up_to(l - 1, &selected)
    }

    fn count_up_to(bound: i64, selected: &[bool; 16]) -> i64 {
        if bound < 0 {
            return 0;
        }
        let value = format!("{:016}", bound);
        let digits = value.as_bytes();
        let mut dp = vec![vec![0i64; 11]; 2];
        dp[1][10] = 1;
        for position in 0..16 {
            let mut next = vec![vec![0i64; 11]; 2];
            for tight in 0..2 {
                let limit = if tight == 1 {
                    (digits[position] - b'0') as usize
                } else {
                    9
                };
                for previous in 0..=10 {
                    let ways = dp[tight][previous];
                    if ways == 0 {
                        continue;
                    }
                    for digit in 0..=limit {
                        if selected[position] && previous != 10 && digit < previous {
                            continue;
                        }
                        let next_previous = if selected[position] { digit } else { previous };
                        let next_tight = usize::from(tight == 1 && digit == limit);
                        next[next_tight][next_previous] += ways;
                    }
                }
            }
            dp = next;
        }
        dp.iter().flatten().sum()
    }
}
