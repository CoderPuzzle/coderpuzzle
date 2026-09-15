/**
 * @param {number[][]} customers
 * @return {number}
 */
var averageWaitingTime = function (customers) {
    // Each customer's wait is settled the moment the previous order is
    // scheduled: the chef starts at max(freeAt, arrival), finishes at
    // start + time, and the wait is finish - arrival. The arrivals are
    // sorted, so one forward sweep carrying the chef's free time replays
    // the whole day. The waits total to at most about 5 * 10^13, far
    // below 2^53, so plain numbers carry the sum exactly, and the single
    // division at the end is the only floating-point step.
    let totalWaiting = 0;
    let freeAt = 0;
    for (const [arrival, time] of customers) {
        const start = Math.max(freeAt, arrival);
        freeAt = start + time;
        totalWaiting += freeAt - arrival;
    }
    return totalWaiting / customers.length;
};
