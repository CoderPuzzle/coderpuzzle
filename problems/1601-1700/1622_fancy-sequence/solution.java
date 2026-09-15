import java.util.ArrayList;
import java.util.List;

class Fancy {

    // A running (mult, add) pair represents the affine transform every
    // already-appended value has picked up so far: current value = stored *
    // mult + add (mod MOD). addAll/multAll only touch that pair — O(1) —
    // and never walk the sequence. append folds the transform's inverse
    // into the value being stored, so that re-applying the transform later
    // reproduces exactly the value that was appended, no matter how many
    // addAll/multAll calls land in between.
    private static final long MOD = 1_000_000_007L;

    private long mult = 1;
    private long add = 0;
    private final List<Long> stored = new ArrayList<>();

    public Fancy() {}

    public void append(int val) {
        // Undo the current transform up front: stored * mult + add == val,
        // so stored == (val - add) * inverse(mult) (mod MOD). mult is
        // never 0 mod MOD (each multAll factor is 1..100, and MOD is
        // prime), so the modular inverse always exists.
        long inv = modPow(mult, MOD - 2, MOD);
        long storedVal = (Math.floorMod(val - add, MOD) * inv) % MOD;
        stored.add(storedVal);
    }

    public void addAll(int inc) {
        add = (add + inc) % MOD;
    }

    public void multAll(int m) {
        mult = (mult * m) % MOD;
        add = (add * m) % MOD;
    }

    public int getIndex(int idx) {
        if (idx < 0 || idx >= stored.size()) {
            return -1;
        }
        return (int) ((stored.get(idx) * mult + add) % MOD);
    }

    private static long modPow(long base, long exp, long mod) {
        long result = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
            exp >>= 1;
        }
        return result;
    }
}
