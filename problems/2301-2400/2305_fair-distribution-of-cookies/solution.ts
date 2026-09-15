function distributeCookies(cookies: number[], k: number): number {
    const children: number[] = new Array(k).fill(0);
    let best = Infinity;

    function backtrack(i: number, curMax: number): void {
        // bound pruning: the running max only grows, so this branch can no
        // longer beat the best complete distribution found so far
        if (curMax >= best) return;
        // all bags placed: the running max is this leaf's unfairness
        if (i === cookies.length) {
            best = curMax;
            return;
        }
        const tried = new Set<number>();
        for (let j = 0; j < k; j++) {
            // symmetry: children holding equal totals are interchangeable,
            // so try each distinct total only once
            if (tried.has(children[j])) continue;
            tried.add(children[j]);
            children[j] += cookies[i];
            backtrack(i + 1, Math.max(curMax, children[j]));
            children[j] -= cookies[i];
        }
    }

    backtrack(0, 0);
    return best;
}
