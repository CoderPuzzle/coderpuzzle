/**
 * @param {number[]} chargeTimes
 * @param {number[]} runningCosts
 * @param {number} budget
 * @return {number}
 */
var maximumRobots = function (chargeTimes, runningCosts, budget) {
    const n = chargeTimes.length;
    const dq = []; // indices with decreasing chargeTimes
    let head = 0; // front of the deque
    let run = 0;
    let left = 0;
    let best = 0;
    // cost max(charge) + k*sum(run) is monotone in the window, so a
    // two-pointer sweep maximizes length under the budget
    for (let right = 0; right < n; right++) {
        // back indices with charge <= the new one can never be the max
        while (dq.length > head && chargeTimes[dq[dq.length - 1]] <= chargeTimes[right]) {
            dq.pop();
        }
        dq.push(right);
        run += runningCosts[right];
        // over budget: shrink from the left, dropping the front (the argmax)
        // once left passes it; the window may empty to length 0
        while (dq.length > head && chargeTimes[dq[head]] + (right - left + 1) * run > budget) {
            if (dq[head] === left) {
                head++;
            }
            run -= runningCosts[left];
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
};
