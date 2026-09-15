// A user's UAM is the size of the set of minutes they acted in, so one pass
// grouping logs into per-user minute sets is all the counting needed; each
// user then lands in exactly one answer bucket.
function findingUsersActiveMinutes(logs: number[][], k: number): number[] {
    const minutesByUser = new Map<number, Set<number>>();
    for (const [user, minute] of logs) {
        let minutes = minutesByUser.get(user);
        if (minutes === undefined) {
            minutes = new Set<number>();
            minutesByUser.set(user, minutes);
        }
        minutes.add(minute);
    }
    const answer = new Array<number>(k).fill(0);
    for (const minutes of minutesByUser.values()) {
        // k covers every user's UAM by the constraints; the guard only
        // keeps a malformed k from writing out of range.
        if (minutes.size <= k) {
            answer[minutes.size - 1] += 1;
        }
    }
    return answer;
}
