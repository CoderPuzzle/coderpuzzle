/**
 * @param {number} n
 * @param {number[][]} meetings
 * @param {number} firstPerson
 * @return {number[]}
 */
var findAllPeople = function (n, meetings, firstPerson) {
    meetings.sort((left, right) => left[2] - right[2]);
    const knows = new Array(n).fill(false);
    knows[0] = true;
    knows[firstPerson] = true;
    let start = 0;
    while (start < meetings.length) {
        let end = start;
        const graph = new Map();
        while (end < meetings.length && meetings[end][2] === meetings[start][2]) {
            const [x, y] = meetings[end++];
            if (!graph.has(x)) graph.set(x, []);
            if (!graph.has(y)) graph.set(y, []);
            graph.get(x).push(y);
            graph.get(y).push(x);
        }

        const queue = [];
        for (const person of graph.keys()) if (knows[person]) queue.push(person);
        for (let head = 0; head < queue.length; head++) {
            for (const other of graph.get(queue[head])) {
                if (!knows[other]) {
                    knows[other] = true;
                    queue.push(other);
                }
            }
        }
        start = end;
    }

    const answer = [];
    for (let person = 0; person < n; person++) if (knows[person]) answer.push(person);
    return answer;
};
