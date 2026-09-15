impl Solution {
    pub fn rank_teams(votes: Vec<String>) -> String {
        let mut seen = [false; 26];
        for b in votes[0].bytes() {
            seen[(b - b'A') as usize] = true;
        }
        let p = votes[0].len();
        let mut counts = vec![vec![0i32; p]; 26];
        for vote in &votes {
            for (i, b) in vote.bytes().enumerate() {
                counts[(b - b'A') as usize][i] += 1;
            }
        }
        let mut teams: Vec<char> = (0..26).filter(|&i| seen[i]).map(|i| (b'A' + i as u8) as char).collect();
        teams.sort_by(|&a, &b| {
            let ra = &counts[(a as u8 - b'A') as usize];
            let rb = &counts[(b as u8 - b'A') as usize];
            if ra != rb {
                rb.cmp(ra)
            } else {
                a.cmp(&b)
            }
        });
        teams.into_iter().collect()
    }
}
