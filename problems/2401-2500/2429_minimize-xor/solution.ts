function minimizeXor(num1: number, num2: number): number {
    // x must carry exactly popcount(num2) set bits and differ from
    // num1 as little as possible. A bit kept from num1 contributes 0
    // to the xor, so spend the budget first on num1's highest set
    // bits (they dominate the value), then set the lowest zero bits
    // with whatever budget remains.
    let budget = bitCount(num2);
    let x = 0;
    for (let i = 30; i >= 0; i--) {
        const bit = num1 & (1 << i);
        if (bit && budget > 0) {
            x |= bit;
            budget--;
        }
    }
    for (let i = 0; i < 31 && budget > 0; i++) {
        if ((x & (1 << i)) === 0) {
            x |= 1 << i;
            budget--;
        }
    }
    return x;
}

function bitCount(n: number): number {
    let count = 0;
    while (n) {
        n &= n - 1;
        count++;
    }
    return count;
}
