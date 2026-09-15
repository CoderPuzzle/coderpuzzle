function countTriplets(arr: number[]): number {
    // per prefix value: occurrence count and sum of (index+1); seeded
    // with the empty prefix so segments starting at index 0 count too
    const count = new Map<number, number>([[0, 1]]);
    const indexSum = new Map<number, number>([[0, 0]]);
    let prefix = 0;
    let answer = 0;
    for (let j = 0; j < arr.length; j++) {
        prefix ^= arr[j];
        // equal prefixes at p < j => arr[p+1..j] XORs to 0 and every
        // internal split works: sum over such p of (j - p - 1)
        // telescopes to j * count - indexSum
        if (count.has(prefix)) {
            answer += j * count.get(prefix)! - indexSum.get(prefix)!;
            count.set(prefix, count.get(prefix)! + 1);
            indexSum.set(prefix, indexSum.get(prefix)! + (j + 1));
        } else {
            count.set(prefix, 1);
            indexSum.set(prefix, j + 1);
        }
    }
    return answer;
}
