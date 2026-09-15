/**
 * @param {number[]} pid
 * @param {number[]} ppid
 * @param {number} kill
 * @return {number[]}
 */
var killProcess = function (pid, ppid, kill) {
    // Killing a process kills its whole subtree, so group the processes
    // by parent — children of one parent keep pid-array order — and walk
    // down from kill. The queue doubles as the answer: every process
    // enters it in exactly the required breadth-first order, so each
    // dequeue is one more confirmed kill.
    const children = new Map();
    for (let i = 0; i < pid.length; ++i) {
        const kids = children.get(ppid[i]);
        if (kids !== undefined) {
            kids.push(pid[i]);
        } else {
            children.set(ppid[i], [pid[i]]);
        }
    }
    const killed = [kill];
    for (let head = 0; head < killed.length; ++head) {
        const kids = children.get(killed[head]);
        if (kids !== undefined) {
            for (const child of kids) {
                killed.push(child);
            }
        }
    }
    return killed;
};
