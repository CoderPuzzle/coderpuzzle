/**
 * Boxes are delivered in order, so every voyage carries a contiguous
 * stretch boxes l+1..i and costs 2 + runs[i] - runs[l+1]: one trip per
 * port change inside the stretch, plus the first port and the return to
 * storage (runs counts port changes before each index). Pulling the
 * i-dependent part out of dp[i]'s window minimum leaves key[l] =
 * dp[l] - runs[l+1], so a monotonic queue of l values keyed by key
 * answers each DP step in constant time while the weight and box limits
 * slide the window forward.
 * @param {number[][]} boxes
 * @param {number} portsCount
 * @param {number} maxBoxes
 * @param {number} maxWeight
 * @return {number}
 */
var boxDelivering = function (boxes, portsCount, maxBoxes, maxWeight) {
    const n = boxes.length;
    // running loaded weight reaches 10^5 * 10^5 = 10^10, still exact in a double
    const weightPrefix = [0];
    const runs = [0];
    for (let i = 0; i < n; i++) {
        weightPrefix.push(weightPrefix[i] + boxes[i][1]);
        runs.push(runs[i] + (i > 0 && boxes[i - 1][0] !== boxes[i][0] ? 1 : 0));
    }
    const dp = new Array(n + 1).fill(0);
    const key = new Array(n); // key[l] = dp[l] - runs[l+1], the part of the cost l alone decides
    const window = []; // candidate l values with strictly increasing keys
    let head = 0;
    let lightest = 0; // smallest l whose loaded weight still fits maxWeight
    for (let i = 1; i <= n; i++) {
        const fresh = i - 1;
        key[fresh] = dp[fresh] - runs[i];
        while (window.length > head && key[window[window.length - 1]] >= key[fresh]) {
            window.pop();
        }
        window.push(fresh);
        // weights are positive, so this floor only moves forward
        while (weightPrefix[i] - weightPrefix[lightest] > maxWeight) {
            lightest++;
        }
        const low = Math.max(lightest, i - maxBoxes);
        while (window[head] < low) {
            head++;
        }
        dp[i] = 2 + runs[i] + key[window[head]];
    }
    return dp[n];
};
