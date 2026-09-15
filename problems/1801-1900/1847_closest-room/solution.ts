function closestRoom(rooms: number[][], queries: number[][]): number[] {
    const roomsBySize = rooms.map((_, i) => i).sort((a, b) => rooms[b][1] - rooms[a][1]);
    // Offline trick: process queries by decreasing minSize so rooms only accumulate.
    const queryOrder = queries.map((_, j) => j).sort((a, b) => queries[b][1] - queries[a][1]);
    const lowerBound = (arr: number[], target: number): number => {
        let lo = 0,
            hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    const ids: number[] = [];
    const answers: number[] = new Array(queries.length);
    let ri = 0;
    for (const j of queryOrder) {
        const preferred = queries[j][0];
        const minSize = queries[j][1];
        // Every room with size >= minSize qualifies; once inserted it stays
        // valid for all later queries (their thresholds are only smaller).
        while (ri < roomsBySize.length && rooms[roomsBySize[ri]][1] >= minSize) {
            const id = rooms[roomsBySize[ri]][0];
            const pos = lowerBound(ids, id);
            ids.splice(pos, 0, id);
            ri += 1;
        }
        // Closest candidates sit just below/above the insertion point; best stays -1 when both miss.
        const pos = lowerBound(ids, preferred);
        let best = -1;
        let bestDist = Infinity;
        if (pos > 0) {
            best = ids[pos - 1];
            bestDist = preferred - ids[pos - 1];
        }
        // Strict < keeps floor (the smaller id) when the distances tie.
        if (pos < ids.length && ids[pos] - preferred < bestDist) {
            best = ids[pos];
        }
        answers[j] = best; // write via saved index: original order kept
    }
    return answers;
}
