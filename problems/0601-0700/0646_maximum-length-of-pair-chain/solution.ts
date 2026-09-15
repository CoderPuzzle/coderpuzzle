function findLongestChain(pairs: number[][]): number {
    // Taking the compatible pair that ends earliest leaves the most room,
    // so sorting by right endpoint makes a single greedy pass optimal.
    const sorted = pairs.slice().sort((a, b) => a[1] - b[1]);
    let length = 0;
    let currentEnd = -Infinity;
    for (const [left, right] of sorted) {
        // Strict > encodes the strict b < c rule; touching pairs can't chain.
        if (left > currentEnd) {
            length += 1;
            currentEnd = right;
        }
    }
    return length;
}
