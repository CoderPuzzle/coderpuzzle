/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumInvitations = function (grid) {
    // Maximum bipartite matching: each boy in turn looks for a girl, and
    // when his only choices are taken, an augmenting path asks an earlier
    // boy to reroute — the matched count grows by one exactly when such a
    // path exists.
    const m = grid.length;
    const n = grid[0].length;
    const invitations = new Array(n).fill(-1); // girl j is invited by boy invitations[j]

    const invite = (boy, seen) => {
        for (let girl = 0; girl < n; girl++) {
            if (grid[boy][girl] === 1 && !seen.has(girl)) {
                seen.add(girl);
                if (invitations[girl] === -1 || invite(invitations[girl], seen)) {
                    invitations[girl] = boy;
                    return true;
                }
            }
        }
        return false;
    };

    let accepted = 0;
    for (let boy = 0; boy < m; boy++) {
        if (invite(boy, new Set())) {
            accepted += 1;
        }
    }
    return accepted;
};
