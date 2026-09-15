/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function (n, headID, manager, informTime) {
    // arrival[i] = minutes until employee i starts spreading the news.
    const arrival = new Array(n).fill(-1);
    arrival[headID] = 0;
    const resolve = (start) => {
        if (arrival[start] >= 0) return arrival[start];
        const chain = [];
        let current = start;
        while (arrival[current] < 0) {
            chain.push(current);
            current = manager[current];
        }
        for (let k = chain.length - 1; k >= 0; k--) {
            const employee = chain[k];
            const boss = manager[employee];
            arrival[employee] = arrival[boss] + informTime[boss];
        }
        return arrival[start];
    };
    let best = 0;
    for (let employee = 0; employee < n; employee++) {
        best = Math.max(best, resolve(employee));
    }
    return best;
};
