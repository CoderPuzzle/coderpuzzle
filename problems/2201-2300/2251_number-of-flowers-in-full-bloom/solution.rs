impl Solution {
    pub fn full_bloom_flowers(flowers: Vec<Vec<i32>>, people: Vec<i32>) -> Vec<i32> {
        // The two sides can be sorted separately: a query never needs to know
        // which start belongs to which end, only the two one-sided counts.
        let mut starts: Vec<i32> = flowers.iter().map(|f| f[0]).collect();
        let mut ends: Vec<i32> = flowers.iter().map(|f| f[1]).collect();
        starts.sort_unstable();
        ends.sort_unstable();
        people
            .iter()
            .map(|&t| {
                // blooming at t: start <= t and end >= t. The first partition
                // point counts starts <= t (a flower starting exactly at t is
                // blooming); the second counts ends < t, so a flower ending
                // exactly at t is still counted.
                let a = starts.partition_point(|&x| x <= t);
                let b = ends.partition_point(|&x| x < t);
                (a - b) as i32
            })
            .collect()
    }
}
