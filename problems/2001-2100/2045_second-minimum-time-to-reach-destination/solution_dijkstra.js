/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} time
 * @param {number} change
 * @return {number}
 */
var secondMinimum = function (n, edges, time, change) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [left, right] of edges) {
        graph[left].push(right);
        graph[right].push(left);
    }

    const infinity = 2147483647;
    const first = new Int32Array(n + 1);
    const second = new Int32Array(n + 1);
    first.fill(infinity);
    second.fill(infinity);
    first[1] = 0;

    function MinHeap() {
        this.a = [];
    }
    MinHeap.prototype.size = function () {
        return this.a.length;
    };
    MinHeap.prototype.push = function (item) {
        const a = this.a;
        a.push(item);
        let i = a.length - 1;
        while (i > 0) {
            const par = (i - 1) >> 1;
            if (a[par][0] <= a[i][0]) break;
            [a[par], a[i]] = [a[i], a[par]];
            i = par;
        }
    };
    MinHeap.prototype.pop = function () {
        const a = this.a;
        const top = a[0];
        const last = a.pop();
        if (a.length > 0) {
            a[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                let m = i;
                if (l < a.length && a[l][0] < a[m][0]) m = l;
                if (r < a.length && a[r][0] < a[m][0]) m = r;
                if (m === i) break;
                [a[m], a[i]] = [a[i], a[m]];
                i = m;
            }
        }
        return top;
    };

    const pending = new MinHeap();
    pending.push([0, 1]);

    while (pending.size() > 0) {
        const [distance, vertex] = pending.pop();
        // stale entry: both slots improved after this was pushed
        if (distance > second[vertex]) {
            continue;
        }
        const nextDistance = distance + 1;
        for (const neighbor of graph[vertex]) {
            if (nextDistance < first[neighbor]) {
                second[neighbor] = first[neighbor];
                first[neighbor] = nextDistance;
                pending.push([nextDistance, neighbor]);
            } else if (first[neighbor] < nextDistance && nextDistance < second[neighbor]) {
                second[neighbor] = nextDistance;
                pending.push([nextDistance, neighbor]);
            }
        }
    }

    let elapsed = 0;
    for (let step = 0; step < second[n]; ++step) {
        if (Math.floor(elapsed / change) % 2 === 1) {
            elapsed = (Math.floor(elapsed / change) + 1) * change;
        }
        elapsed += time;
    }
    return elapsed;
};
