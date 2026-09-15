// The lead can only change hands when a vote is cast, so the constructor
// reduces the whole history to one array: it walks the votes once, keeping
// running counts and the current leader, and a ballot that merely ties the
// maximum takes the lead — the most recent vote among the tied candidates.
// q(t) then only has to locate the last vote at or before t, which is a
// binary search because times is strictly increasing, and read the leader
// recorded there.
class TopVotedCandidate {
    constructor(persons, times) {
        this.times = times;
        // person ids are dense in [0, n), so a plain count array indexes them
        const counts = new Array(persons.length).fill(0);
        this.leaders = [];
        let best = 0;
        let leader = 0;
        for (const person of persons) {
            counts[person]++;
            // a tie at the maximum hands the lead to the caster of this very
            // ballot — the most recent vote among the tied candidates
            if (counts[person] >= best) {
                best = counts[person];
                leader = person;
            }
            this.leaders.push(leader);
        }
    }

    q(t) {
        // upper bound: the first index past every vote at or before t, so a
        // ballot cast exactly at t counts
        let lo = 0;
        let hi = this.times.length;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (this.times[mid] <= t) lo = mid + 1;
            else hi = mid;
        }
        return this.leaders[lo - 1];
    }
}
