/**
 * @param {number[]} tickets
 * @param {number} k
 * @return {number}
 */
var timeRequiredToBuy = function (tickets, k) {
    const target = tickets[k];
    let elapsed = 0;
    for (let index = 0; index < tickets.length; index++) {
        elapsed += Math.min(tickets[index], index <= k ? target : target - 1);
    }
    return elapsed;
};
