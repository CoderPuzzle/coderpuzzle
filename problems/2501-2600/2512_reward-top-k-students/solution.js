/**
 * @param {string[]} positive_feedback
 * @param {string[]} negative_feedback
 * @param {string[]} report
 * @param {number[]} student_id
 * @param {number} k
 * @return {number[]}
 */
var topStudents = function (positive_feedback, negative_feedback, report, student_id, k) {
    // Membership sets make each report token O(1) to classify: +3 for a
    // positive word, -1 for a negative one, everything else free.
    // Sorting the (-points, id) pairs ascending is exactly the asked
    // ranking — highest points first, lower ID breaking ties — so the
    // first k identifiers are the answer.
    const positives = new Set(positive_feedback);
    const negatives = new Set(negative_feedback);
    const ranked = [];
    for (let i = 0; i < report.length; i++) {
        let points = 0;
        for (const word of report[i].split(" ")) {
            if (positives.has(word)) points += 3;
            else if (negatives.has(word)) points -= 1;
        }
        ranked.push([-points, student_id[i]]);
    }
    ranked.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return ranked.slice(0, k).map((pair) => pair[1]);
};
