impl Solution {
    pub fn findSecretWord(interrogator: &mut Master, wordlist: Vec<String>) {
        let matches = |a: &str, b: &str| -> usize { a.bytes().zip(b.bytes()).filter(|(x, y)| x == y).count() };
        let mut candidates = wordlist;
        while !candidates.is_empty() {
            // Pick the word whose worst-case surviving group is smallest:
            // bucket every candidate by its agreement with the candidate
            // under review, and keep the candidate with the smallest largest
            // bucket (minimax elimination).
            let mut best = candidates[0].clone();
            let mut best_worst = candidates.len() + 1;
            for word in &candidates {
                let mut groups = [0usize; 7];
                for other in &candidates {
                    groups[matches(word, other)] += 1;
                }
                let worst = *groups.iter().max().unwrap();
                if worst < best_worst {
                    best = word.clone();
                    best_worst = worst;
                }
            }
            let score = interrogator.guess(&best);
            if score == best.len() as i32 {
                return;
            }
            let mut survivors = Vec::with_capacity(candidates.len());
            for word in &candidates {
                if matches(word, &best) == score as usize {
                    survivors.push(word.clone());
                }
            }
            candidates = survivors;
        }
    }
}
