impl Solution {
    pub fn min_time_to_type(word: String) -> i32 {
        // The pointer sits on a 26-letter ring. Between two consecutive
        // letters there are only two arcs — clockwise and counterclockwise
        // — and the cheaper one is always optimal, because the cost to
        // type every future character does not depend on which arc was
        // taken (only the final position matters, which is the same either
        // way). Sum the cheaper arc for each letter, then add one second
        // per character for typing it.
        let mut seconds = word.len() as i32;
        let mut pos: i32 = 0; // pointer starts on 'a'
        for ch in word.bytes() {
            let target = (ch - b'a') as i32;
            let diff = (target - pos).abs();
            seconds += diff.min(26 - diff);
            pos = target;
        }
        seconds
    }
}
