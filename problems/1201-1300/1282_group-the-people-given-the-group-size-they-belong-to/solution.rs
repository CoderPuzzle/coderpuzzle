// Bucket ids by required size, then slice each bucket into chunks of
// exactly that size — the input guarantees each bucket divides evenly.
impl Solution {
    pub fn group_the_people(group_sizes: Vec<i32>) -> Vec<Vec<i32>> {
        let mut buckets: std::collections::HashMap<i32, Vec<i32>> = std::collections::HashMap::new();
        for (person, &size) in group_sizes.iter().enumerate() {
            buckets.entry(size).or_default().push(person as i32);
        }
        // A valid grouping exists, so every bucket length is a multiple of
        // its size and the slices come out even.
        buckets
            .into_iter()
            .flat_map(|(size, members)| members.chunks(size as usize).map(|c| c.to_vec()).collect::<Vec<_>>())
            .collect()
    }
}
