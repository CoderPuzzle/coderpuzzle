function minCostClimbingStairs(cost: number[]): number {
    // Rolling states: cheapest total cost to be standing on each step.
    // Both start at 0 — the starting step is free to choose.
    let prev2 = 0,
        prev1 = 0;
    for (const c of cost) {
        // Arrive from i-1 or i-2, paying this step's cost on the hop.
        const cur = c + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = cur;
    }
    // The top is one final paid hop from the last or second-to-last step.
    return Math.min(prev1, prev2);
}
