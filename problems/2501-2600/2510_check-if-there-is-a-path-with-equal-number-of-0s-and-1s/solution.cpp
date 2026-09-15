#include <cstdint>
#include <vector>

class Solution {
  public:
    bool isThereAPath(std::vector<std::vector<int>> &grid) {
        // Monotone moves give cell (i, j) exactly i + j + 1 visited
        // cells, so every balance (#1s - #0s) reachable there lies
        // inside [-(m+n-1), m+n-1] — a window of up to 399 values, one
        // bit per balance packed into uint64_t words. Each column
        // carries such a word-set for the current row; a cell unions its
        // top and left neighbour sets and shifts the whole set by its
        // own value. Balance 0 surviving at the bottom-right corner is
        // the answer.
        int m = static_cast<int>(grid.size());
        int n = static_cast<int>(grid[0].size());
        int half = m + n - 1;
        int words = (2 * half + 64) / 64;
        std::vector<std::vector<uint64_t>> cols(n, std::vector<uint64_t>(words));
        setBit(cols[0], half + (grid[0][0] == 1 ? 1 : -1));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0)
                    continue;
                std::vector<uint64_t> merged(words, 0);
                if (i > 0)
                    for (int w = 0; w < words; w++)
                        merged[w] |= cols[j][w];
                if (j > 0)
                    for (int w = 0; w < words; w++)
                        merged[w] |= cols[j - 1][w];
                std::vector<uint64_t> out(words, 0);
                shift(merged, grid[i][j] == 1, out);
                cols[j] = out;
            }
        }
        return getBit(cols[n - 1], half);
    }

  private:
    void setBit(std::vector<uint64_t> &bits, int index) { bits[index >> 6] |= 1ULL << (index & 63); }

    bool getBit(const std::vector<uint64_t> &bits, int index) {
        return ((bits[index >> 6] >> (index & 63)) & 1ULL) != 0;
    }

    void shift(const std::vector<uint64_t> &bits, bool up, std::vector<uint64_t> &out) {
        if (up) { // every balance rises by one: shift the set toward MSB
            uint64_t carry = 0;
            for (size_t w = 0; w < bits.size(); w++) {
                out[w] = (bits[w] << 1) | carry;
                carry = bits[w] >> 63;
            }
        } else { // every balance falls by one: shift toward LSB
            uint64_t rem = 0;
            for (int w = static_cast<int>(bits.size()) - 1; w >= 0; w--) {
                out[w] = (bits[w] >> 1) | (rem << 63);
                rem = bits[w] & 1ULL;
            }
        }
    }
};
