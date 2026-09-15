impl Solution {
    pub fn minimum_teachings(n: i32, languages: Vec<Vec<i32>>, friendships: Vec<Vec<i32>>) -> i32 {
        // Exactly one language may be taught, so a friendship that already
        // shares some language is settled forever and never forces teaching;
        // filter down to the needy pairs that share nothing. A chosen
        // language L fixes exactly the needy pairs whose both sides know L
        // afterwards, and a user lacking L is taught once however many
        // needy pairs it appears in — so the answer is the minimum, over
        // the n languages, of the users to teach.
        let langs = n as usize;
        let users = languages.len();
        let mut known = vec![vec![false; langs + 1]; users + 1];
        for user in 1..=users {
            for &language in &languages[user - 1] {
                known[user][language as usize] = true;
            }
        }
        let needy: Vec<(usize, usize)> = friendships
            .iter()
            .filter(|pair| {
                let (u, v) = (pair[0] as usize, pair[1] as usize);
                (1..=langs).all(|language| !(known[u][language] && known[v][language]))
            })
            .map(|pair| (pair[0] as usize, pair[1] as usize))
            .collect();
        let mut best = users;
        for language in 1..=langs {
            // taught[user] keeps each user lacking this language counted
            // once across every needy pair it takes part in.
            let mut taught = vec![false; users + 1];
            let mut count = 0;
            for &(u, v) in &needy {
                for user in [u, v] {
                    if !known[user][language] && !taught[user] {
                        taught[user] = true;
                        count += 1;
                    }
                }
            }
            best = best.min(count);
        }
        best as i32
    }
}
