function findItinerary(tickets: string[][]): string[] {
    const graph = new Map<string, string[]>();
    for (const [departure, arrival] of tickets) {
        if (!graph.has(departure)) {
            graph.set(departure, []);
        }
        (graph.get(departure) as string[]).push(arrival);
    }
    for (const adj of graph.values()) {
        adj.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0)); // descending
    }

    // Iterative Hierholzer: always take the lexicographically smallest
    // unused ticket (last element of the descending-sorted list).
    const route: string[] = [];
    const stack: string[] = ["JFK"];
    while (stack.length > 0) {
        const airport = stack[stack.length - 1];
        const adj = graph.get(airport);
        if (adj && adj.length > 0) {
            stack.push(adj.pop() as string);
        } else {
            // No unused edges left: emit in postorder so dead-end
            // airports land at their latest possible position.
            route.push(airport);
            stack.pop();
        }
    }
    return route.reverse();
}
