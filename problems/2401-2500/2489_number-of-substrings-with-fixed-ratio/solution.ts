function fixedRatio(s: string, num1: number, num2: number): number {
    // A substring's zeros z and ones o have ratio num1 : num2 exactly when
    // z*num2 == o*num1. With prefix counts Z, O, the substring (l, r)
    // qualifies exactly when Z[r]*num2 - O[r]*num1 equals Z[l]*num2 -
    // O[l]*num1, so counting pairs of equal prefix keys is the whole task.
    // Keys stay below 10^10 and answers below 2.5e9, both exact in a double.
    const seen = new Map<number, number>([[0, 1]]);
    let z = 0;
    let o = 0;
    let ans = 0;
    for (const ch of s) {
        if (ch === "0") z += 1;
        else o += 1;
        const key = z * num2 - o * num1;
        const prev = seen.get(key) || 0;
        ans += prev;
        seen.set(key, prev + 1);
    }
    return ans;
}
