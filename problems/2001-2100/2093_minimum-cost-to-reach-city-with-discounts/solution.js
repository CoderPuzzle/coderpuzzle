/**
 * @param {number} n
 * @param {number[][]} highways
 * @param {number} discounts
 * @return {number}
 */
var minimumCost = function (n, highways, discounts) {
    const graph = Array.from({ length: n }, () => []);
    for (const [left, right, toll] of highways) {
        graph[left].push([right, toll]);
        graph[right].push([left, toll]);
    }

    const distances = Array.from({ length: n }, () => new Array(discounts + 1).fill(Infinity));
    distances[0][0] = 0;
    const heap = [[0, 0, 0]];
    const push = (state) => {
        heap.push(state);
        let index = heap.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (heap[parent][0] <= heap[index][0]) break;
            [heap[parent], heap[index]] = [heap[index], heap[parent]];
            index = parent;
        }
    };
    const pop = () => {
        const root = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let index = 0;
            while (true) {
                let smallest = index;
                const left = index * 2 + 1;
                const right = left + 1;
                if (left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
                if (right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;
                if (smallest === index) break;
                [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
                index = smallest;
            }
        }
        return root;
    };

    while (heap.length > 0) {
        const [cost, city, used] = pop();
        if (cost !== distances[city][used]) continue;
        if (city === n - 1) return cost;
        for (const [neighbor, toll] of graph[city]) {
            const fullCost = cost + toll;
            if (fullCost < distances[neighbor][used]) {
                distances[neighbor][used] = fullCost;
                push([fullCost, neighbor, used]);
            }
            if (used < discounts) {
                const discountedCost = cost + Math.floor(toll / 2);
                if (discountedCost < distances[neighbor][used + 1]) {
                    distances[neighbor][used + 1] = discountedCost;
                    push([discountedCost, neighbor, used + 1]);
                }
            }
        }
    }
    return -1;
};
