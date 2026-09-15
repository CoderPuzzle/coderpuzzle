// A bit array plus a lazy orientation flag. The stored byte always
// means "effective bit XOR flag", so fix/unfix complement their write
// while the set is flipped, flip() only toggles the flag and re-derives
// ones as size - ones, and all/one/count just read the counter.
// toString is the one place every bit passes through the flag again.
class Bitset {
    constructor(size) {
        this.bits = new Array(size).fill(0);
        this.flipped = 0;
        this.ones = 0;
    }

    fix(idx) {
        if ((this.bits[idx] ^ this.flipped) === 0) {
            this.bits[idx] = 1 - this.flipped;
            this.ones += 1;
        }
    }

    unfix(idx) {
        if ((this.bits[idx] ^ this.flipped) === 1) {
            this.bits[idx] = this.flipped;
            this.ones -= 1;
        }
    }

    flip() {
        this.flipped ^= 1;
        this.ones = this.bits.length - this.ones;
    }

    all() {
        return this.ones === this.bits.length;
    }

    one() {
        return this.ones > 0;
    }

    count() {
        return this.ones;
    }

    toString() {
        let composition = "";
        for (const bit of this.bits) {
            composition += (bit ^ this.flipped).toString();
        }
        return composition;
    }
}
