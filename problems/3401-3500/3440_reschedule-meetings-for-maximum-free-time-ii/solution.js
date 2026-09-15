/**
 * @param {number} eventTime
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @return {number}
 */
var maxFreeTime = function (eventTime, startTime, endTime) {
    // Removing meeting i frees the span between its neighbours, which is
    // g[i] + d + g[i+1] long with g the gaps around it. If i fits into a
    // gap OTHER than its two flanking ones, that whole span becomes free
    // time; otherwise i can only slide inside it, leaving g[i] + g[i+1]
    // free. Prefix/suffix maxima over the gap array make "largest
    // non-flanking gap" an O(1) lookup, so the scan stays linear.
    const n = startTime.length;
    const gaps = new Array(n + 1).fill(0);
    gaps[0] = startTime[0];
    for (let i = 1; i < n; ++i) gaps[i] = startTime[i] - endTime[i - 1];
    gaps[n] = eventTime - endTime[n - 1];
    const prefix = new Array(n + 2).fill(0);
    for (let i = 0; i <= n; ++i) prefix[i + 1] = Math.max(prefix[i], gaps[i]);
    const suffix = new Array(n + 2).fill(0);
    for (let i = n; i >= 0; --i) suffix[i] = Math.max(suffix[i + 1], gaps[i]);
    let answer = 0;
    for (const gap of gaps) answer = Math.max(answer, gap);
    for (let i = 0; i < n; ++i) {
        const duration = endTime[i] - startTime[i];
        // Largest gap outside i's two flanking gaps decides move vs slide.
        const host = Math.max(prefix[i], suffix[i + 2]);
        const merged = gaps[i] + gaps[i + 1];
        answer = Math.max(answer, host >= duration ? merged + duration : merged);
    }
    return answer;
};
