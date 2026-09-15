use std::collections::BTreeMap;

// Per-name sorted time lists; a query slices its window into chunks and
// counts each chunk with two partition_point searches.
pub struct TweetCounts {
    times: BTreeMap<String, Vec<i64>>,
}

impl TweetCounts {
    pub fn new() -> Self {
        TweetCounts { times: BTreeMap::new() }
    }

    pub fn record_tweet(&mut self, tweet_name: String, time: i64) {
        let list = self.times.entry(tweet_name).or_default();
        let at = list.partition_point(|t| *t <= time);
        list.insert(at, time);
    }

    pub fn get_tweet_counts_per_frequency(
        &mut self,
        freq: String,
        tweet_name: String,
        start_time: i64,
        end_time: i64,
    ) -> Vec<i32> {
        let chunk = match freq.as_str() {
            "minute" => 60i64,
            "hour" => 3600,
            _ => 86400,
        };
        let empty: Vec<i64> = Vec::new();
        let list = self.times.get(&tweet_name).unwrap_or(&empty);
        let mut buckets = Vec::new();
        let mut lo = start_time;
        while lo <= end_time {
            let hi = (lo + chunk - 1).min(end_time);
            let lower = list.partition_point(|t| *t < lo);
            let upper = list.partition_point(|t| *t <= hi);
            buckets.push((upper - lower) as i32);
            lo += chunk;
        }
        buckets
    }
}
