function arraysIntersection(arr1: number[], arr2: number[], arr3: number[]): number[] {
    // One index per sorted array; the smallest current values can never
    // reappear ahead, so they are safe to step past.
    let i = 0,
        j = 0,
        k = 0;
    const out: number[] = [];
    while (i < arr1.length && j < arr2.length && k < arr3.length) {
        const a = arr1[i],
            b = arr2[j],
            c = arr3[k];
        if (a === b && b === c) {
            out.push(a);
            ++i;
            ++j;
            ++k;
            continue;
        }
        const smallest = Math.min(a, b, c);
        if (a === smallest) ++i;
        if (b === smallest) ++j;
        if (c === smallest) ++k;
    }
    return out;
}
