function rearrangeBarcodes(barcodes: number[]): number[] {
    const n = barcodes.length;
    const counts = new Map<number, number>();
    for (const b of barcodes) {
        counts.set(b, (counts.get(b) ?? 0) + 1);
    }

    const order = Array.from(counts.keys());
    order.sort((a, c) => {
        const freqA = counts.get(a)!;
        const freqC = counts.get(c)!;
        if (freqA !== freqC) {
            return freqC - freqA;
        }
        return a - c;
    });

    const result = new Array(n).fill(0);
    let pos = 0;
    for (const value of order) {
        const count = counts.get(value)!;
        for (let i = 0; i < count; i++) {
            if (pos >= n) {
                pos = 1;
            }
            result[pos] = value;
            pos += 2;
        }
    }

    return result;
}
