impl Solution {
    pub fn catch_maximum_amount_of_people(team: Vec<i32>, dist: i32) -> i32 {
        // Two-pointer greedy over the sorted "it" and "not it" positions:
        // each "it" catches the leftmost uncaught person within its reach.
        let it: Vec<i32> = team
            .iter()
            .enumerate()
            .filter(|(_, &v)| v == 1)
            .map(|(i, _)| i as i32)
            .collect();
        let not_it: Vec<i32> = team
            .iter()
            .enumerate()
            .filter(|(_, &v)| v == 0)
            .map(|(i, _)| i as i32)
            .collect();
        let (mut i, mut j, mut caught) = (0usize, 0usize, 0);
        while i < it.len() && j < not_it.len() {
            if not_it[j] < it[i] - dist {
                // Too far left: every later "it" is further right, so this
                // person can never be caught; skip them.
                j += 1;
            } else if not_it[j] > it[i] + dist {
                // Too far right for this "it": it can catch no one, move on.
                i += 1;
            } else {
                caught += 1;
                i += 1;
                j += 1;
            }
        }
        caught
    }
}
