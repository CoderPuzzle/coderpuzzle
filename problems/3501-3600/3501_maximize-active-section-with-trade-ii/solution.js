/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var maxActiveSectionsAfterTrade = function (s, queries) {
    let ones = 0;
    const starts = [];
    const lens = [];
    let index = 0;
    const length = s.length;
    while (index < length) {
        if (s[index] === "0") {
            const runStart = index;
            while (index < length && s[index] === "0") index++;
            starts.push(runStart);
            lens.push(index - runStart);
        } else {
            ones++;
            index++;
        }
    }
    const groups = starts.length;
    const ends = starts.map((start, k) => start + lens[k] - 1);

    // Sparse table for range maximum over adjacent sums lens[k]+lens[k+1].
    const table = [];
    if (groups >= 2) {
        const size = groups - 1;
        table.push(Array.from({ length: size }, (_, k) => lens[k] + lens[k + 1]));
        while (1 << table.length <= size) {
            const previous = table[table.length - 1];
            const step = 1 << (table.length - 1);
            const row = new Array(size - 2 * step + 1);
            for (let q = 0; q < row.length; ++q) row[q] = Math.max(previous[q], previous[q + step]);
            table.push(row);
        }
    }
    const logs = [0, 0];
    for (let q = 2; q <= Math.max(1, groups - 1); ++q) logs[q] = logs[q >> 1] + 1;

    return queries.map(([left, right]) => {
        let gain = 0;
        if (groups >= 2) {
            // Zero runs clipped by the window edges only shrink the two
            // boundary pairs; every fully interior pair is exact.
            let first = 0;
            let high = groups - 1;
            while (first < high) {
                const mid = (first + high) >> 1;
                if (ends[mid] < left) first = mid + 1;
                else high = mid;
            }
            if (ends[first] >= left) {
                let afterRight = groups;
                let low = 0;
                high = groups;
                while (low < high) {
                    const mid = (low + high) >> 1;
                    if (starts[mid] <= right) low = mid + 1;
                    else high = mid;
                }
                afterRight = low - 1;
                const last = afterRight - 1;
                if (first <= last) {
                    const clipLeft = Math.min(lens[first], ends[first] - left + 1);
                    const clipRight = Math.min(lens[last + 1], right - starts[last + 1] + 1);
                    let pairFirst;
                    let pairLast;
                    if (first === last) {
                        pairFirst = clipLeft + clipRight;
                        pairLast = pairFirst;
                    } else {
                        pairFirst = clipLeft + lens[first + 1];
                        pairLast = lens[last] + clipRight;
                    }
                    const innerLo = first + (s[left] === "0" ? 1 : 0);
                    const innerHi = last - (s[right] === "0" ? 1 : 0);
                    let inner = 0;
                    if (innerLo <= innerHi) {
                        const level = logs[innerHi - innerLo + 1];
                        const row = table[level];
                        inner = Math.max(row[innerLo], row[innerHi - (1 << level) + 1]);
                    }
                    gain = Math.max(pairFirst, pairLast, inner);
                }
            }
        }
        return ones + gain;
    });
};
