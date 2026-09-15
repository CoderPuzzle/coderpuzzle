/**
 * @param {number[]} arrival
 * @param {number[]} state
 * @return {number[]}
 */
var timeTaken = function (arrival, state) {
    // Two FIFO queues fed by an arrival pointer (equal arrival seconds
    // enter index order automatically). prevDir carries the direction of
    // the previous second: while both sides compete the door keeps its
    // streak, and exits win only when the door has just been idle.
    const n = arrival.length;
    const enterQ = [];
    const exitQ = [];
    let eh = 0;
    let xh = 0;
    const ans = new Array(n);
    let i = 0;
    let t = 0;
    let prevDir = -1; // -1 unused, 0 entering, 1 exiting
    let done = 0;
    while (done < n) {
        while (i < n && arrival[i] <= t) {
            if (state[i] === 1) {
                exitQ.push(i);
            } else {
                enterQ.push(i);
            }
            i++;
        }
        if (enterQ.length === eh && exitQ.length === xh) {
            t = arrival[i]; // jump the clock; idle breaks any streak
            prevDir = -1;
            continue;
        }
        const hasEnter = enterQ.length > eh;
        const hasExit = exitQ.length > xh;
        let d;
        if (hasEnter && hasExit) {
            d = prevDir !== -1 ? prevDir : 1;
        } else {
            d = hasExit ? 1 : 0;
        }
        if (d === 1) {
            ans[exitQ[xh++]] = t;
        } else {
            ans[enterQ[eh++]] = t;
        }
        prevDir = d;
        done++;
        t++;
    }
    return ans;
};
