pub struct TweetCounts;

impl TweetCounts {
    pub fn new() -> Self {
        panic!("TODO")
    }

    pub fn record_tweet(&mut self, tweetName: String, time: i64) {
        panic!("TODO")
    }

    pub fn get_tweet_counts_per_frequency(
        &mut self,
        freq: String,
        tweetName: String,
        startTime: i64,
        endTime: i64,
    ) -> Vec<i32> {
        panic!("TODO")
    }
}
