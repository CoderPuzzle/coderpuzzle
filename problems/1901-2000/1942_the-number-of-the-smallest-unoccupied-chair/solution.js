/**
 * @param {number[][]} times
 * @param {number} targetFriend
 * @return {number}
 */
var smallestChair = function (times, targetFriend) {
    const n = times.length;
    const order = [];
    for (let i = 0; i < n; i++) order.push(i);
    order.sort((a, b) => times[a][0] - times[b][0]);
    const hpush = (h, v) => {
        h.push(v);
        let i = h.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (h[p] <= h[i]) break;
            const t = h[p];
            h[p] = h[i];
            h[i] = t;
            i = p;
        }
    };
    const hpop = (h) => {
        const top = h[0];
        const last = h.pop();
        if (h.length > 0) {
            h[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1;
                const r = l + 1;
                let s = i;
                if (l < h.length && h[l] < h[s]) s = l;
                if (r < h.length && h[r] < h[s]) s = r;
                if (s === i) break;
                const t = h[s];
                h[s] = h[i];
                h[i] = t;
                i = s;
            }
        }
        return top;
    };
    // occupied: min-heap of encoded values leaving * 2^20 + chair
    const occupied = [];
    const free = [];
    let nextChair = 0;
    for (const i of order) {
        const arrival = times[i][0];
        const leaving = times[i][1];
        while (occupied.length > 0 && Math.floor(occupied[0] / 1048576) <= arrival) {
            const enc = hpop(occupied);
            hpush(free, enc % 1048576);
        }
        let chair;
        if (free.length > 0) {
            chair = hpop(free);
        } else {
            chair = nextChair;
            nextChair += 1;
        }
        if (i === targetFriend) return chair;
        hpush(occupied, leaving * 1048576 + chair);
    }
    return -1;
};
