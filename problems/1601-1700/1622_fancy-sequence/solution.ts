// A running (mult, add) pair represents the affine transform every
// already-appended value has picked up so far: current value = stored *
// mult + add (mod MOD). addAll/multAll only touch that pair — O(1) — and
// never walk the sequence. append folds the transform's inverse into the
// value being stored, so that re-applying the transform later reproduces
// exactly the value that was appended, no matter how many addAll/multAll
// calls land in between.
const MOD = 1_000_000_007n;

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
    let result = 1n;
    base %= mod;
    while (exp > 0n) {
        if (exp & 1n) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp >>= 1n;
    }
    return result;
}

class Fancy {
    private mult: bigint = 1n;
    private add: bigint = 0n;
    private stored: bigint[] = [];

    constructor() {}

    append(val: number) {
        // Undo the current transform up front: stored * mult + add == val,
        // so stored == (val - add) * inverse(mult) (mod MOD). mult is
        // never 0 mod MOD (each multAll factor is 1..100, and MOD is
        // prime), so the modular inverse always exists.
        const inv = modPow(this.mult, MOD - 2n, MOD);
        const diff = (((BigInt(val) - this.add) % MOD) + MOD) % MOD;
        this.stored.push((diff * inv) % MOD);
    }

    addAll(inc: number) {
        this.add = (this.add + BigInt(inc)) % MOD;
    }

    multAll(m: number) {
        this.mult = (this.mult * BigInt(m)) % MOD;
        this.add = (this.add * BigInt(m)) % MOD;
    }

    getIndex(idx: number): number {
        if (idx < 0 || idx >= this.stored.length) {
            return -1;
        }
        return Number((this.stored[idx] * this.mult + this.add) % MOD);
    }
}
