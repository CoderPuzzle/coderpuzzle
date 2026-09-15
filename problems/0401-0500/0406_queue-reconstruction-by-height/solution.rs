impl Solution {
    pub fn reconstruct_queue(people: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut ordered = people.clone();
        ordered.sort_by(|a, b| {
            if a[0] != b[0] {
                b[0].cmp(&a[0]) // taller first
            } else {
                a[1].cmp(&b[1]) // fewer people in front first
            }
        });
        // With everyone already placed taller-or-equal, inserting at index k
        // puts exactly k such people in front; shorter people inserted later
        // are invisible to taller people's counts.
        let mut queue: Vec<Vec<i32>> = Vec::with_capacity(ordered.len());
        for person in ordered {
            let pos = person[1] as usize;
            queue.insert(pos, person);
        }
        queue
    }
}
