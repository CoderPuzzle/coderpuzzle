class Solution {
    static int letterBits(char ch) {
        // Two bits per letter: A=0, C=1, G=2, T=3.
        switch (ch) {
        case 'C':
            return 1;
        case 'G':
            return 2;
        case 'T':
            return 3;
        default:
            return 0;
        }
    }

  public:
    vector<string> findRepeatedDnaSequences(string s) {
        unordered_set<int> seen;
        // A second set collects each repeated window exactly once, even when
        // it occurs three or more times.
        unordered_set<int> repeated;
        // 20-bit register: ten letters times two bits each. The oldest
        // letter slides out as the new one slides in.
        unsigned int code = 0;
        for (size_t i = 0; i < s.size(); i++) {
            code = ((code << 2) | letterBits(s[i])) & 0xFFFFFu;
            // Fewer than ten letters seen: no full window yet.
            if (i >= 9) {
                // insert() reports false when the window was already seen,
                // i.e. it occurs at least twice.
                if (!seen.insert((int)code).second) {
                    repeated.insert((int)code);
                }
            }
        }
        // Decode the surviving codes back into letters.
        vector<string> result;
        result.reserve(repeated.size());
        for (int value : repeated) {
            string letters(10, 'A');
            unsigned int bits = value;
            for (int k = 9; k >= 0; k--) {
                letters[k] = "ACGT"[bits & 3];
                bits >>= 2;
            }
            result.push_back(letters);
        }
        // Sorted output for a deterministic order.
        sort(result.begin(), result.end());
        return result;
    }
};
