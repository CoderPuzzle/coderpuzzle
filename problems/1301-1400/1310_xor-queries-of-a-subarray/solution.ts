function xorQueries(arr: number[], queries: number[][]): number[] {
    // prefix[t] = XOR of the first t elements (prefix[0] = 0).
    const prefix: number[] = [0];
    for (const x of arr) {
        prefix.push(prefix[prefix.length - 1] ^ x);
    }
    // Self-inverse XOR telescopes: elements before l appear in both operands
    // and annihilate, leaving exactly arr[l..r] — O(1) per query.
    return queries.map(([l, r]) => prefix[r + 1] ^ prefix[l]);
}
