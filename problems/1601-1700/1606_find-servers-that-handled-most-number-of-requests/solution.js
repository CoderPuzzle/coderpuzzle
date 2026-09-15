/**
 * @param {number} k
 * @param {number[]} arrival
 * @param {number[]} load
 * @return {number[]}
 */
var busiestServers = function (k, arrival, load) {
    const tree = new Array(k + 1).fill(0);
    const update = (server, delta) => {
        let i = server + 1;
        while (i <= k) {
            tree[i] += delta;
            i += i & -i;
        }
    };
    const query = (count) => {
        let sum = 0;
        let i = count;
        while (i > 0) {
            sum += tree[i];
            i -= i & -i;
        }
        return sum;
    };
    const findKth = (rank) => {
        let pos = 0;
        let pw = 1;
        while (pw * 2 <= k) pw *= 2;
        while (pw > 0) {
            if (pos + pw <= k && tree[pos + pw] < rank) {
                pos += pw;
                rank -= tree[pos];
            }
            pw = Math.floor(pw / 2);
        }
        return pos;
    };

    for (let server = 0; server < k; server++) update(server, 1);

    // Min-heap of [finishTime, server] pairs, ordered by finish time.
    const heap = () => ({ a: [] });
    const less = (x, y) => x[0] < y[0];
    const push = (h, v) => {
        h.a.push(v);
        let i = h.a.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (less(h.a[i], h.a[p])) {
                const t = h.a[i];
                h.a[i] = h.a[p];
                h.a[p] = t;
                i = p;
            } else break;
        }
    };
    const pop = (h) => {
        const top = h.a[0];
        const last = h.a.pop();
        if (h.a.length > 0) {
            h.a[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                let m = i;
                if (l < h.a.length && less(h.a[l], h.a[m])) m = l;
                if (r < h.a.length && less(h.a[r], h.a[m])) m = r;
                if (m === i) break;
                const t = h.a[i];
                h.a[i] = h.a[m];
                h.a[m] = t;
                i = m;
            }
        }
        return top;
    };
    const peek = (h) => h.a[0];

    const n = arrival.length;
    const counts = new Array(k).fill(0);
    const busy = heap();

    for (let i = 0; i < n; i++) {
        const startTime = arrival[i];
        while (busy.a.length > 0 && peek(busy)[0] <= startTime) {
            const [, freed] = pop(busy);
            update(freed, 1);
        }

        const totalFree = query(k);
        if (totalFree === 0) continue;

        const start = i % k;
        const beforeStart = query(start);
        const server = beforeStart < totalFree ? findKth(beforeStart + 1) : findKth(1);

        update(server, -1);
        counts[server]++;
        push(busy, [startTime + load[i], server]);
    }

    let busiest = 0;
    for (const c of counts) busiest = Math.max(busiest, c);
    const answer = [];
    for (let server = 0; server < k; server++) {
        if (counts[server] === busiest) answer.push(server);
    }
    return answer;
};
