/**
 * @param {number[][]} slots1
 * @param {number[][]} slots2
 * @param {number} duration
 * @return {number[]}
 */
var minAvailableDuration = function (slots1, slots2, duration) {
    const a = [...slots1].sort((x, y) => x[0] - y[0]);
    const b = [...slots2].sort((x, y) => x[0] - y[0]);
    let i = 0,
        j = 0;
    while (i < a.length && j < b.length) {
        const start = Math.max(a[i][0], b[j][0]);
        const end = Math.min(a[i][1], b[j][1]);
        if (end - start >= duration) return [start, start + duration];
        // The earlier-ending slot cannot overlap any later slot of the other
        // person, so only that pointer advances.
        if (a[i][1] < b[j][1]) ++i;
        else ++j;
    }
    return [];
};
