/**
 * @param {number} numberOfUsers
 * @param {string[][]} events
 * @return {number[]}
 */
var countMentions = function (numberOfUsers, events) {
    // Chronological sweep: order events by timestamp, offline events
    // ahead of messages at the same moment (a status change applies
    // before any message sharing its timestamp). Each user's return
    // time is the offline timestamp + 60; a message at time t sees the
    // user once that return time has passed.
    const ordered = [...events].sort(
        (a, b) => Number(a[1]) - Number(b[1]) || (a[0] === "OFFLINE" ? 0 : 1) - (b[0] === "OFFLINE" ? 0 : 1),
    );
    const mentions = new Array(numberOfUsers).fill(0);
    const backAt = new Array(numberOfUsers).fill(0);
    for (const [kind, rawTime, payload] of ordered) {
        const time = Number(rawTime);
        if (kind === "OFFLINE") {
            backAt[Number(payload)] = time + 60;
            continue;
        }
        for (const token of payload.split(" ")) {
            if (token === "ALL") {
                for (let user = 0; user < numberOfUsers; user++) {
                    mentions[user] += 1;
                }
            } else if (token === "HERE") {
                for (let user = 0; user < numberOfUsers; user++) {
                    if (backAt[user] <= time) {
                        mentions[user] += 1;
                    }
                }
            } else {
                mentions[Number(token.slice(2))] += 1;
            }
        }
    }
    return mentions;
};
