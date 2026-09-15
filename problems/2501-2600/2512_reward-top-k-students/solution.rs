use std::collections::HashSet;

impl Solution {
    pub fn top_students(
        positive_feedback: Vec<String>,
        negative_feedback: Vec<String>,
        report: Vec<String>,
        student_id: Vec<i32>,
        k: i32,
    ) -> Vec<i32> {
        // Membership sets make each report token O(1) to classify: +3
        // for a positive word, -1 for a negative one, everything else
        // free. Sorting the (-points, id) pairs ascending is exactly the
        // asked ranking — highest points first, lower ID breaking ties —
        // so the first k identifiers are the answer.
        let positives: HashSet<&str> = positive_feedback.iter().map(|w| w.as_str()).collect();
        let negatives: HashSet<&str> = negative_feedback.iter().map(|w| w.as_str()).collect();
        let mut ranked: Vec<(i32, i32)> = Vec::with_capacity(report.len());
        for (text, &sid) in report.iter().zip(student_id.iter()) {
            let mut points = 0;
            for word in text.split(' ') {
                if positives.contains(word) {
                    points += 3;
                } else if negatives.contains(word) {
                    points -= 1;
                }
            }
            ranked.push((-points, sid));
        }
        ranked.sort_unstable();
        ranked.truncate(k as usize);
        ranked.into_iter().map(|(_, sid)| sid).collect()
    }
}
