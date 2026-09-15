impl Solution {
    pub fn soup_servings(n: i32) -> f64 {
        // Round up to whole servings of 25 mL each.
        let m = (n + 24) / 25;
        if m >= 179 {
            return 1.0;
        }

        let mut table = vec![vec![0.0f64; (m + 1) as usize]; (m + 1) as usize];

        fn value(table: &Vec<Vec<f64>>, a: i32, b: i32) -> f64 {
            if a <= 0 && b <= 0 {
                return 0.5;
            }
            if a <= 0 {
                return 1.0;
            }
            if b <= 0 {
                return 0.0;
            }
            table[a as usize][b as usize]
        }

        for a in 1..=m {
            for b in 1..=m {
                table[a as usize][b as usize] = 0.25
                    * (value(&table, a - 4, b)
                        + value(&table, a - 3, b - 1)
                        + value(&table, a - 2, b - 2)
                        + value(&table, a - 1, b - 3));
            }
        }

        value(&table, m, m)
    }
}
