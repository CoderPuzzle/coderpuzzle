/**
 * @param {number} n
 * @param {number[][]} meetings
 * @param {number} firstPerson
 * @return {number[]}
 */
var findAllPeople = function (n, meetings, firstPerson) {
    const parent = new Array(n);
    for (let person = 0; person < n; person++) parent[person] = person;
    // Path-halving: splice every other node directly under its
    // grandparent, flattening the tree while walking to the root.
    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    // Moment 0: person 0 hands the whisper to firstPerson, so the two
    // share a component while everybody else is still a singleton.
    parent[0] = firstPerson;
    meetings.sort((left, right) => left[2] - right[2]);
    let start = 0;
    while (start < meetings.length) {
        let end = start;
        while (end < meetings.length && meetings[end][2] === meetings[start][2]) {
            const [x, y] = meetings[end++];
            const ra = find(x),
                rb = find(y);
            if (ra !== rb) parent[ra] = rb;
        }

        // Roll back every attendee this moment left uninformed: their
        // merges must not leak the whisper into a later moment.
        const groupRoot = find(0);
        for (let index = start; index < end; index++) {
            const [x, y] = meetings[index];
            if (find(x) !== groupRoot) parent[x] = x;
            if (find(y) !== groupRoot) parent[y] = y;
        }
        start = end;
    }

    const root = find(0);
    const answer = [];
    for (let person = 0; person < n; person++) if (find(person) === root) answer.push(person);
    return answer;
};
