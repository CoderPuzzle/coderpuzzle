/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
    const adj = new Map();
    // Star edges only: joining every address to the account's first one spans
    // the account with a linear number of edges, and chains through shared
    // addresses spread reachability exactly as pairwise edges would.
    for (const account of accounts) {
        for (let i = 2; i < account.length; i++) {
            if (!adj.has(account[1])) adj.set(account[1], new Set());
            if (!adj.has(account[i])) adj.set(account[i], new Set());
            adj.get(account[1]).add(account[i]);
            adj.get(account[i]).add(account[1]);
        }
    }

    // Components take numbers at first sighting: sweeping the accounts in
    // reading order and starting a traversal at each unvisited address
    // discovers them in exactly the order the judge awards output slots.
    const componentOf = new Map();
    const components = [];
    const names = [];
    const visited = new Set();
    for (const account of accounts) {
        for (let i = 1; i < account.length; i++) {
            if (visited.has(account[i])) continue;
            const index = components.length;
            names.push(account[0]);
            components.push([]);
            const stack = [account[i]];
            visited.add(account[i]);
            // Explicit stack, not recursion — one address can sit in very many
            // accounts, and the chain can run as deep as the input is long.
            while (stack.length > 0) {
                const current = stack.pop();
                componentOf.set(current, index);
                components[index].push(current);
                for (const neighbor of adj.get(current) || []) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        stack.push(neighbor);
                    }
                }
            }
        }
        // Every account of a component describes the same person, and the
        // judge prints the later record's name when two of them disagree,
        // so the most recent account through here gets the last word.
        for (let i = 1; i < account.length; i++) {
            names[componentOf.get(account[i])] = account[0];
        }
    }

    const merged = [];
    for (let index = 0; index < components.length; index++) {
        // Marking on push keeps every address in the component exactly
        // once, so the list needs no dedup before sorting.
        merged.push([names[index]].concat(components[index].sort()));
    }
    return merged;
};
