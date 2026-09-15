/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
    // difference array (n + 1 slots keeps the stamp at index last in
    // bounds when last == n): each booking costs two writes instead of
    // touching every flight in [first, last]
    const diff = new Array(n + 1).fill(0);
    for (const [first, last, seats] of bookings) {
        diff[first - 1] += seats;
        // -seats one slot past the range end, so flight `last` still
        // sees the seats and every later flight does not
        diff[last] -= seats;
    }
    // one prefix sum over the stamps: each +/- pair cancels exactly
    // beyond its range, so the running total is each flight's occupancy
    const answer = [];
    let running = 0;
    for (let i = 0; i < n; i++) {
        running += diff[i];
        answer.push(running);
    }
    return answer;
};
