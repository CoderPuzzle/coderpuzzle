// Two binary heaps: sells as a min-heap on price, buys as a max-heap.
// An incoming batch trades with the best-priced opposing batch while the
// price condition holds; only its unmatched remainder joins the backlog
// as one new batch. Totals reach 1e5 * 1e9 = 1e14, far below 2^53, so
// plain numbers sum exactly; the answer is reduced modulo 1e9 + 7.
function getNumberOfBacklogOrders(orders: number[][]): number {
    const swap = (h: number[][], i: number, j: number): void => {
        [h[i], h[j]] = [h[j], h[i]];
    };
    const push = (h: number[][], less: (a: number[], b: number[]) => boolean, x: number[]): void => {
        h.push(x);
        let i = h.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (!less(h[i], h[p])) break;
            swap(h, i, p);
            i = p;
        }
    };
    const pop = (h: number[][], less: (a: number[], b: number[]) => boolean): number[] => {
        const top = h[0];
        const last = h.pop()!;
        if (h.length > 0) {
            h[0] = last;
            let i = 0;
            for (;;) {
                let m = i;
                const l = 2 * i + 1;
                const r = l + 1;
                if (l < h.length && less(h[l], h[m])) m = l;
                if (r < h.length && less(h[r], h[m])) m = r;
                if (m === i) break;
                swap(h, i, m);
                i = m;
            }
        }
        return top;
    };
    const sells: number[][] = []; // [price, amount], cheapest on top
    const buys: number[][] = []; // [price, amount], priciest on top
    const sellLess = (a: number[], b: number[]) => a[0] < b[0];
    const buyLess = (a: number[], b: number[]) => a[0] > b[0];
    for (const [price, startAmount, orderType] of orders) {
        let amount = startAmount;
        if (orderType === 0) {
            while (amount > 0 && sells.length > 0 && sells[0][0] <= price) {
                const take = Math.min(amount, sells[0][1]);
                amount -= take;
                sells[0][1] -= take;
                if (sells[0][1] === 0) pop(sells, sellLess);
            }
            if (amount > 0) push(buys, buyLess, [price, amount]);
        } else {
            while (amount > 0 && buys.length > 0 && buys[0][0] >= price) {
                const take = Math.min(amount, buys[0][1]);
                amount -= take;
                buys[0][1] -= take;
                if (buys[0][1] === 0) pop(buys, buyLess);
            }
            if (amount > 0) push(sells, sellLess, [price, amount]);
        }
    }
    let total = 0;
    for (const b of sells) total += b[1];
    for (const b of buys) total += b[1];
    return total % 1000000007;
}
