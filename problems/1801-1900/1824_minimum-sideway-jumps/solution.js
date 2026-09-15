/**
 * @param {number[]} obstacles
 * @return {number}
 */
var minSideJumps = function (obstacles) {
    // dp[lane] = fewest side jumps needed to stand on that lane at the
    // point being processed. Forward moves are free, a lane change is
    // one jump, so each new point relaxes every open lane against the
    // previous point's cheapest lane plus one.
    const INF = 1000000000;
    let dp = [INF, 1, 0, 1]; // lanes indexed 1..3; start on lane 2
    for (let point = 1; point < obstacles.length; ++point) {
        const blocked = obstacles[point];
        dp[blocked] = INF;
        const best = Math.min(dp[1], dp[2], dp[3]);
        for (let lane = 1; lane <= 3; ++lane) {
            if (lane !== blocked) dp[lane] = Math.min(dp[lane], best + 1);
        }
    }
    return Math.min(dp[1], dp[2], dp[3]);
};
