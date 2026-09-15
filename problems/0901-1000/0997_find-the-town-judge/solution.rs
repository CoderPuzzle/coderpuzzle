impl Solution {
    pub fn find_judge(n: i32, trust: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut score = vec![0i32; n + 1];
        for pair in &trust {
            let a = pair[0] as usize;
            let b = pair[1] as usize;
            score[a] -= 1;
            score[b] += 1;
        }

        for person in 1..=n {
            if score[person] == (n as i32) - 1 {
                return person as i32;
            }
        }
        -1
    }
}
