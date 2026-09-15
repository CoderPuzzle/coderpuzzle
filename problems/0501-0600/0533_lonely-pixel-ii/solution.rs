use std::collections::HashMap;

impl Solution {
    pub fn find_black_pixel(picture: Vec<Vec<String>>, target: i32) -> i32 {
        // Rule 2 asks every row carrying a black pixel in column c to be an
        // exact copy of row r, so rows only interact through their content:
        // identical rows form a class keyed by the joined row string.
        let m = picture.len();
        let n = picture[0].len();
        let mut class_of_key: HashMap<String, usize> = HashMap::new();
        let mut class_row_count: Vec<usize> = Vec::new();
        let mut row_class = vec![0usize; m];
        let mut col_count = vec![0usize; n];
        for i in 0..m {
            let key = picture[i].concat();
            let class = match class_of_key.get(&key) {
                Some(&known) => known,
                None => {
                    let fresh = class_row_count.len();
                    class_row_count.push(count_blacks(&picture[i]));
                    class_of_key.insert(key, fresh);
                    fresh
                }
            };
            row_class[i] = class;
            for j in 0..n {
                if picture[i][j] == "B" {
                    col_count[j] += 1;
                }
            }
        }
        // blacks[j][k]: how many black cells column j carries from class k.
        let classes = class_row_count.len();
        let mut blacks = vec![vec![0usize; classes]; n];
        for i in 0..m {
            for j in 0..n {
                if picture[i][j] == "B" {
                    blacks[j][row_class[i]] += 1;
                }
            }
        }
        // A column pays out exactly target pixels when its target blacks all
        // come from one class (rule 2) whose rows hold target blacks (rule 1).
        let want = target as usize;
        let mut total = 0usize;
        for j in 0..n {
            if col_count[j] != want {
                continue;
            }
            for k in 0..classes {
                if blacks[j][k] == want && class_row_count[k] == want {
                    total += want;
                }
            }
        }
        total as i32
    }
}

fn count_blacks(row: &[String]) -> usize {
    let mut blacks = 0;
    for cell in row {
        if cell == "B" {
            blacks += 1;
        }
    }
    blacks
}
