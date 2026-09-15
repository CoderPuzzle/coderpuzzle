/**
 * @param {string} initialCurrency
 * @param {string[][]} pairs1
 * @param {number[]} rates1
 * @param {string[][]} pairs2
 * @param {number[]} rates2
 * @return {number}
 */
var maxAmount = function (initialCurrency, pairs1, rates1, pairs2, rates2) {
    // Day 1 ends holding some intermediate currency c, and day 2
    // converts c back to initialCurrency. Rates are consistent (no
    // contradictions), so the first BFS visit to a currency already
    // carries its maximum amount: day 1 is one BFS from initialCurrency
    // (forward edges multiply by the rate, reverse edges divide by it),
    // and day 2 reruns the same BFS from every currency reached on
    // day 1, carrying that currency's amount. The answer is the largest
    // amount of initialCurrency any of those searches ends with.
    const build = (pairs, rates) => {
        const graph = new Map();
        const add = (from, to, rate, forward) => {
            if (!graph.has(from)) graph.set(from, []);
            graph.get(from).push([to, rate, forward]);
        };
        for (let i = 0; i < pairs.length; ++i) {
            add(pairs[i][0], pairs[i][1], rates[i], true);
            add(pairs[i][1], pairs[i][0], rates[i], false);
        }
        return graph;
    };
    // First-visit amount of every currency reachable from source.
    const spread = (graph, source, startAmount) => {
        const amounts = new Map([[source, startAmount]]);
        const order = [source];
        for (let head = 0; head < order.length; ++head) {
            for (const [target, rate, forward] of graph.get(order[head]) || []) {
                if (amounts.has(target)) continue;
                const amount = amounts.get(order[head]);
                amounts.set(target, forward ? amount * rate : amount / rate);
                order.push(target);
            }
        }
        return [order, amounts];
    };
    const [visited, day1] = spread(build(pairs1, rates1), initialCurrency, 1.0);
    const day2 = build(pairs2, rates2);
    let best = 0.0;
    for (const currency of visited) {
        // Unreachable initialCurrency simply offers no candidate.
        const reached = spread(day2, currency, day1.get(currency))[1].get(initialCurrency);
        if (reached !== undefined) best = Math.max(best, reached);
    }
    return best;
};
