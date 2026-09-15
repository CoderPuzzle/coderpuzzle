// The lead can only change hands when a vote is cast, so the constructor
// reduces the whole history to one array: it walks the votes once, keeping
// running counts and the current leader, and a ballot that merely ties the
// maximum takes the lead — the most recent vote among the tied candidates.
// q(t) then only has to locate the last vote at or before t, which is a
// binary search because times is strictly increasing, and read the leader
// recorded there.
pub struct TopVotedCandidate {
    times: Vec<i32>,
    leaders: Vec<i32>,
}

impl TopVotedCandidate {
    pub fn new(persons: Vec<i32>, times: Vec<i32>) -> Self {
        // person ids are dense in [0, n), so a plain count array indexes them
        let mut counts = vec![0; persons.len()];
        let mut leaders = Vec::with_capacity(persons.len());
        let mut best = 0;
        let mut leader = 0;
        for &person in &persons {
            counts[person as usize] += 1;
            // a tie at the maximum hands the lead to the caster of this very
            // ballot — the most recent vote among the tied candidates
            if counts[person as usize] >= best {
                best = counts[person as usize];
                leader = person;
            }
            leaders.push(leader);
        }
        TopVotedCandidate { times, leaders }
    }

    pub fn q(&mut self, t: i32) -> i32 {
        // upper bound: the first index past every vote at or before t, so a
        // ballot cast exactly at t counts
        let index = self.times.partition_point(|&time| time <= t);
        self.leaders[index - 1]
    }
}
