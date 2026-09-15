/**
 * @param {number} n
 * @param {number[][]} meetings
 * @return {number}
 */
var mostBooked = function (n, meetings) {
    const ordered = meetings.map((m, i) => [m[0], m[1], i]).sort((a, b) => a[0] - b[0] || a[2] - b[2]);
    // endTime[i] = when room i frees up (-1: never used, always free).
    const endTime = new Array(n).fill(-1);
    const count = new Array(n).fill(0);
    for (const [s, e] of ordered) {
        // Lowest-numbered room already free by s wins the allocation.
        let room = -1;
        for (let i = 0; i < n; i++) {
            if (endTime[i] <= s) {
                room = i;
                break;
            }
        }
        if (room === -1) {
            // All busy: take the earliest-finishing room (strict < keeps
            // the lowest index on ties) and delay the meeting there with
            // its original duration.
            room = 0;
            for (let i = 1; i < n; i++) {
                if (endTime[i] < endTime[room]) {
                    room = i;
                }
            }
            endTime[room] += e - s;
        } else {
            endTime[room] = e;
        }
        count[room]++;
    }
    // Strict comparison keeps the lowest room index on count ties.
    let best = 0;
    for (let i = 1; i < n; i++) {
        if (count[i] > count[best]) best = i;
    }
    return best;
};
