function stringShift(s: string, shift: number[][]): string {
    let net = 0;
    for (const [direction, amount] of shift) {
        net += direction === 0 ? amount : -amount;
    }
    const n = s.length;
    const k = ((net % n) + n) % n;
    return s.slice(k) + s.slice(0, k);
}
