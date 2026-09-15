impl Solution {
    pub fn distribute_candies(candies: i32, num_people: i32) -> Vec<i32> {
        // Hand out one gift per turn, cycling through the row. Each turn the
        // gift grows by one; when fewer candies remain than the next gift,
        // the current person takes what is left and the loop ends.
        let mut result = vec![0; num_people as usize];
        let mut candies = candies;
        let mut give = 1;
        let mut index = 0usize;
        while candies > 0 {
            let take = give.min(candies);
            result[index % num_people as usize] += take;
            candies -= take;
            give += 1;
            index += 1;
        }
        result
    }
}
