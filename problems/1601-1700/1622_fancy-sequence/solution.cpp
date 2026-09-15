#include <vector>

// A running (mult, add) pair represents the affine transform every
// already-appended value has picked up so far: current value = stored *
// mult + add (mod MOD). addAll/multAll only touch that pair — O(1) — and
// never walk the sequence. append folds the transform's inverse into the
// value being stored, so that re-applying the transform later reproduces
// exactly the value that was appended, no matter how many addAll/multAll
// calls land in between.
class Fancy {
  public:
    Fancy() : mult(1), add(0) {}

    void append(int val) {
        // Undo the current transform up front: stored * mult + add == val,
        // so stored == (val - add) * inverse(mult) (mod MOD). mult is
        // never 0 mod MOD (each multAll factor is 1..100, and MOD is
        // prime), so the modular inverse always exists.
        long long inv = modPow(mult, MOD - 2);
        long long diff = ((static_cast<long long>(val) - add) % MOD + MOD) % MOD;
        stored.push_back(diff * inv % MOD);
    }

    void addAll(int inc) { add = (add + inc) % MOD; }

    void multAll(int m) {
        mult = (mult * m) % MOD;
        add = (add * m) % MOD;
    }

    int getIndex(int idx) {
        if (idx < 0 || static_cast<size_t>(idx) >= stored.size()) {
            return -1;
        }
        return static_cast<int>((stored[idx] * mult + add) % MOD);
    }

  private:
    static constexpr long long MOD = 1'000'000'007LL;

    long long mult;
    long long add;
    std::vector<long long> stored;

    static long long modPow(long long base, long long exp) {
        long long result = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp & 1) {
                result = result * base % MOD;
            }
            base = base * base % MOD;
            exp >>= 1;
        }
        return result;
    }
};
