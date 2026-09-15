use std::collections::HashMap;

impl Solution {
    pub fn num_rabbits(answers: Vec<i32>) -> i32 {
        // A rabbit answering k fixes its whole color group at k+1 rabbits,
        // and rabbits with different answers can never share one, so every
        // answer value is an independent subproblem. When k is reported c
        // times, those rabbits fill ceil(c / (k+1)) groups - the most one
        // group can hold - and each group counts in full, whether or not
        // all of its rabbits answered.
        let mut count: HashMap<i32, i32> = HashMap::new();
        for &answer in answers.iter() {
            *count.entry(answer).or_insert(0) += 1;
        }
        let mut total = 0;
        for (&answer, &freq) in count.iter() {
            let group = answer + 1;
            total += (freq + group - 1) / group * group;
        }
        total
    }
}
