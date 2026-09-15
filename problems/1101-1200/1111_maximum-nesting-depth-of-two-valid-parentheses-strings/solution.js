/**
 * @param {string} seq
 * @return {number[]}
 */
var maxDepthAfterSplit = function (seq) {
    const answer = [];
    const stack = []; // group id of each still-open parenthesis
    const depth = [0, 0];
    let last = 0;
    for (const char of seq) {
        if (char === "(") {
            // Open in the shallower group; on a tie reuse the group the
            // previous '(' joined, so the depth gap never exceeds one.
            let group;
            if (depth[0] < depth[1]) group = 0;
            else if (depth[1] < depth[0]) group = 1;
            else group = last;
            answer.push(group);
            stack.push(group);
            depth[group]++;
            last = group;
        } else {
            // A ')' must close the matching '(' in the same group.
            const group = stack.pop();
            depth[group]--;
            answer.push(group);
        }
    }
    return answer;
};
