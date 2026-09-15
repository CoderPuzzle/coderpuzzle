function minCosts(cost: number[]): number[] {
    // Reaching position i costs no more than the cheapest swap among people
    // 0..i: swap into the cheapest position, then every later position (being
    // behind you) is free.
    const ans: number[] = [];
    let best = cost[0];
    for (const value of cost) {
        if (value < best) best = value;
        ans.push(best);
    }
    return ans;
}
