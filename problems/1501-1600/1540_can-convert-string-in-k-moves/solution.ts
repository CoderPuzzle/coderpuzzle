function canConvertString(s: string, t: string, k: number): boolean {
    // equal length is guaranteed by the constraints
    if (s.length !== t.length) return false;
    // count how many positions need each shift amount d in 1..25
    const needCount = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        const d = (t.charCodeAt(i) - s.charCodeAt(i) + 26) % 26;
        if (d !== 0) needCount[d]++;
    }
    // the j-th position needing shift d must use move d + 26*(j-1)
    for (let d = 1; d < 26; d++) {
        const count = needCount[d];
        if (count === 0) continue;
        const lastMove = d + 26 * (count - 1);
        if (lastMove > k) return false;
    }
    return true;
}
