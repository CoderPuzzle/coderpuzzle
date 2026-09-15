/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function (timeSeries, duration) {
    // Every attack opens a poison window of `duration` seconds, but a fresh
    // attack inside the still-open window resets the timer, so attack i
    // keeps only the part of its window that runs out before the next
    // attack: min(duration, gap). The final attack is never followed by
    // another, so it always contributes its full duration.
    let total = 0;
    for (let i = 1; i < timeSeries.length; i++) {
        total += Math.min(duration, timeSeries[i] - timeSeries[i - 1]);
    }
    // The running total is the union of the windows so far, which never
    // exceeds t_max + duration <= 2*10^7, which doubles still hold exactly
    // inside their 53-bit integer range.
    return total + duration;
};
