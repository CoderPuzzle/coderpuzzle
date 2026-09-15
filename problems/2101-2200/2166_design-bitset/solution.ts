// A bit array plus a lazy orientation flag. The stored byte always
// means "effective bit XOR flag", so fix/unfix complement their write
// while the set is flipped, flip() only toggles the flag and re-derives
// ones as size - ones, and all/one/count just read the counter.
// toString is the one place every bit passes through the flag again.
class Bitset {
    private bits: number[];
    private flipped: number;
    private ones: number;

    constructor(size: number) {
        this.bits = new Array(size).fill(0);
        this.flipped = 0;
        this.ones = 0;
    }

    fix(idx: number): void {
        if ((this.bits[idx] ^ this.flipped) === 0) {
            this.bits[idx] = 1 - this.flipped;
            this.ones += 1;
        }
    }

    unfix(idx: number): void {
        if ((this.bits[idx] ^ this.flipped) === 1) {
            this.bits[idx] = this.flipped;
            this.ones -= 1;
        }
    }

    flip(): void {
        this.flipped ^= 1;
        this.ones = this.bits.length - this.ones;
    }

    all(): boolean {
        return this.ones === this.bits.length;
    }

    one(): boolean {
        return this.ones > 0;
    }

    count(): number {
        return this.ones;
    }

    toString(): string {
        let composition = "";
        for (const bit of this.bits) {
            composition += (bit ^ this.flipped).toString();
        }
        return composition;
    }
}
