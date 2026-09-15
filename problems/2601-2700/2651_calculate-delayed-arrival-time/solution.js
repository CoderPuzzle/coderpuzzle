/**
 * @param {number} arrivalTime
 * @param {number} delayedTime
 * @return {number}
 */
var findDelayedArrivalTime = function (arrivalTime, delayedTime) {
    // Clock arithmetic: the 24-hour wrap is exactly the remainder of
    // arrival + delay by 24. The sum is at most 23 + 24 = 47, so one
    // modulo covers every wrap.
    return (arrivalTime + delayedTime) % 24;
};
