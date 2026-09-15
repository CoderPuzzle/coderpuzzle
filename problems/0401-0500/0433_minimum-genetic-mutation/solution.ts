// BFS over the mutation graph: genes are nodes, edges join genes that differ
// in exactly one of the 8 characters, and every step after the first must
// land on a bank entry.
function minMutation(startGene: string, endGene: string, bank: string[]): number {
    // Already there: no character has to change, and no path through the
    // bank can beat zero mutations.
    if (startGene === endGene) {
        return 0;
    }
    const visited = new Array<boolean>(bank.length).fill(false);
    let frontier: string[] = [startGene];
    let depth = 0;
    while (frontier.length > 0) {
        depth++;
        const next: string[] = [];
        for (const gene of frontier) {
            for (let i = 0; i < bank.length; ++i) {
                if (visited[i] || differences(gene, bank[i]) !== 1) {
                    continue;
                }
                if (bank[i] === endGene) {
                    return depth;
                }
                visited[i] = true;
                next.push(bank[i]);
            }
        }
        frontier = next;
    }
    return -1;
}

// Number of positions in which two equal-length genes differ.
function differences(a: string, b: string): number {
    let count = 0;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            ++count;
        }
    }
    return count;
}
