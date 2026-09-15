/**
 * @param {string[]} votes
 * @return {string}
 */
var rankTeams = function (votes) {
    const teams = [...new Set(votes[0])].sort();
    const pos = new Map(teams.map((t, i) => [t, i]));
    const counts = new Map(teams.map((t) => [t, new Array(teams.length).fill(0)]));
    for (const vote of votes) {
        for (let i = 0; i < vote.length; i++) {
            counts.get(vote[i])[i] += 1;
        }
    }
    return teams
        .slice()
        .sort((a, b) => {
            const ra = counts.get(a);
            const rb = counts.get(b);
            for (let i = 0; i < ra.length; i++) {
                if (ra[i] !== rb[i]) return rb[i] - ra[i];
            }
            return a < b ? -1 : a > b ? 1 : 0;
        })
        .join("");
};
