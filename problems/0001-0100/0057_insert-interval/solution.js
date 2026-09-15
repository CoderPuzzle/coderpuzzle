/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
    const merged = [];
    const n = intervals.length;
    // The new interval is widened in start/end locals so the caller's
    // newInterval is never mutated while it is being absorbed.
    let start = newInterval[0];
    let end = newInterval[1];
    let i = 0;
    // Phase 1 — an interval ending strictly before the new one starts
    // shares no point with it, so every such interval passes through
    // untouched and in order.
    while (i < n && intervals[i][1] < start) {
        merged.push(intervals[i]);
        ++i;
    }
    // Phase 2 — an interval starting at or before the new end shares at
    // least one point, so it is absorbed by widening [start, end] to
    // cover it. The absorbed intervals are contiguous because the input
    // is sorted by start, so one widening run merges everything.
    while (i < n && intervals[i][0] <= end) {
        start = Math.min(start, intervals[i][0]);
        end = Math.max(end, intervals[i][1]);
        ++i;
    }
    merged.push([start, end]);
    // Phase 3 — whatever is left starts strictly after the new end, so
    // it shares no point with the merged interval either and passes
    // through untouched.
    while (i < n) {
        merged.push(intervals[i]);
        ++i;
    }
    return merged;
};
