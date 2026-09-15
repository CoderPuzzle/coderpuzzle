/**
 * @param {string[]} events
 * @return {number[]}
 */
var scoreValidator = function (events) {
    // Single left-to-right pass. Only "W" moves the counter, so it alone can
    // trigger the stop-at-10 rule; scoring events never stop anything.
    let score = 0;
    let counter = 0;
    for (const event of events) {
        if (event === "W") {
            counter++;
        } else if (event === "WD" || event === "NB") {
            score++;
        } else {
            score += Number(event);
        }
        // Events after the counter reaches 10 are ignored entirely.
        if (counter === 10) break;
    }
    return [score, counter];
};
