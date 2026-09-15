class Solution {
  public:
    vector<int> getGoodIndices(vector<vector<int>> &variables, int target) {
        // Binary exponentiation keeps every intermediate below the modulus
        // squared; mod can be 1, so the seed starts at 1 % mod. Last digit
        // of a^b first (mod 10), then that residue raised to c modulo m —
        // residues stay below 10^3, so squaring fits easily in a 64-bit
        // lane. The index is good exactly when the second residue equals
        // target.
        auto modPow = [](long long base, int exp, int mod) -> long long {
            long long result = 1 % mod;
            base %= mod;
            while (exp > 0) {
                if (exp & 1)
                    result = result * base % mod;
                base = base * base % mod;
                exp >>= 1;
            }
            return result;
        };
        vector<int> good;
        for (int i = 0; i < (int)variables.size(); ++i) {
            const auto &row = variables[i];
            if (modPow(modPow(row[0], row[1], 10), row[2], row[3]) == target)
                good.push_back(i);
        }
        return good;
    }
};
