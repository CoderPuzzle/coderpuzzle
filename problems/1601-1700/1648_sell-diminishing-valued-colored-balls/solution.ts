function maxProfit(inventory: number[], orders: number): number {
    const MOD = 1000000007n;
    const inv = inventory.slice().sort((a, b) => b - a);
    inv.push(0); // sentinel
    let total = 0n;
    let remaining = orders;
    let i = 0;
    const n = inv.length;
    while (remaining > 0 && i < n - 1) {
        while (i + 1 < n - 1 && inv[i + 1] === inv[i]) {
            i += 1;
        }
        const h = inv[i];
        const low = inv[i + 1]; // next distinct level (or 0 sentinel)
        const width = i + 1; // colors currently at level h or above
        const band = width * (h - low); // balls in the full band (low, h]
        if (remaining >= band) {
            // sell every ball valued low+1 .. h for each of the width colors
            total += (BigInt(width) * BigInt(h + low + 1) * BigInt(h - low)) / 2n;
            remaining -= band;
            i += 1;
        } else {
            const full = Math.floor(remaining / width);
            const rem = remaining % width;
            const top = h;
            const bottom = h - full + 1;
            total += (BigInt(width) * BigInt(top + bottom) * BigInt(full)) / 2n;
            total += BigInt(rem) * BigInt(h - full);
            remaining = 0;
        }
    }
    return Number(total % MOD);
}
