/**
 * @param {number[][]} logs
 * @param {number} k
 * @return {number[]}
 */
var findingUsersActiveMinutes = function (logs, k) {
    // A user's UAM is the size of the set of minutes they acted in, so one
    // pass grouping logs into per-user minute sets is all the counting
    // needed; each user then lands in exactly one answer bucket.
    const minutesByUser = new Map();
    for (const [user, minute] of logs) {
        let minutes = minutesByUser.get(user);
        if (minutes === undefined) {
            minutes = new Set();
            minutesByUser.set(user, minutes);
        }
        minutes.add(minute);
    }
    const answer = new Array(k).fill(0);
    for (const minutes of minutesByUser.values()) {
        // k covers every user's UAM by the constraints; the guard only
        // keeps a malformed k from writing out of range.
        if (minutes.size <= k) {
            answer[minutes.size - 1] += 1;
        }
    }
    return answer;
};
