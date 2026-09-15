/**
 * Every query rewrites exactly one element, so the even sum can only change
 * through that element: carry it as a running total — subtract the old value
 * when it is even, apply the addition, add the new value when it is even —
 * and record the total once per query.
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var sumEvenAfterQueries = function (nums, queries) {
    let running = 0;
    for (const value of nums) {
        if (value % 2 === 0) {
            running += value;
        }
    }
    const answer = [];
    for (const [val, index] of queries) {
        const old = nums[index];
        // the old value leaves the total before the addition lands, so a
        // value that flips parity is never counted on both sides
        if (old % 2 === 0) {
            running -= old;
        }
        const updated = old + val;
        nums[index] = updated;
        // % 2 === 0 is the sign-safe evenness test: -2 passes it whatever
        // remainder -3 % 2 yields
        if (updated % 2 === 0) {
            running += updated;
        }
        answer.push(running);
    }
    return answer;
};
