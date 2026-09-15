/**
 * @param {number[]} hours
 * @return {number}
 */
var countCompleteDayPairs = function (hours) {
    // One left-to-right pass keeps a running count per residue class;
    // before joining its own bucket, each index adds the number of earlier
    // values carrying the complementary residue (24 - r) % 24. Answers
    // reach 124999750000 at the limits — precise because Numbers stay
    // exact to 2^53, roughly seventy thousand times that bound.
    const counts = new Array(24).fill(0);
    let answer = 0;
    for (const value of hours) {
        const r = value % 24;
        answer += counts[(24 - r) % 24];
        counts[r]++;
    }
    return answer;
};
