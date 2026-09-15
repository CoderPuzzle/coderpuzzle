/**
 * @param {string[]} logs
 * @return {number}
 */
var minOperations = function (logs) {
    // Track only the current depth: "../" backs up (never below the main
    // folder), "./" is a no-op, and any other entry descends into a
    // named child folder. The final depth is exactly the number of
    // "../" moves needed to return to the main folder.
    let depth = 0;
    for (const log of logs) {
        if (log === "../") {
            depth = Math.max(depth - 1, 0);
        } else if (log === "./") {
            continue;
        } else {
            depth++;
        }
    }
    return depth;
};
