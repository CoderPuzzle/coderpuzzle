function evenSumSubgraphs(nums: number[], edges: number[][]): number {
    const adjacency: number[] = new Array(nums.length).fill(0);
    for (const [left, right] of edges) {
        adjacency[left] |= 1 << right;
        adjacency[right] |= 1 << left;
    }

    let answer = 0;
    for (let mask = 1; mask < 1 << nums.length; ++mask) {
        let parity = 0;
        let bits = mask;
        while (bits !== 0) {
            const bit = bits & -bits;
            parity ^= nums[31 - Math.clz32(bit)];
            bits ^= bit;
        }
        if (parity !== 0) continue;

        let reached = mask & -mask;
        let frontier = reached;
        while (frontier !== 0) {
            let neighbors = 0;
            bits = frontier;
            while (bits !== 0) {
                const bit = bits & -bits;
                neighbors |= adjacency[31 - Math.clz32(bit)];
                bits ^= bit;
            }
            frontier = neighbors & mask & ~reached;
            reached |= frontier;
        }
        if (reached === mask) ++answer;
    }
    return answer;
}
