class Solution {
  public:
    vector<string> ipToCIDR(string ip, int n) {
        // The address lives in a long long: 2^32 (the alignment cap at
        // address 0) must be representable, and a 32-bit type would wrap.
        long long x = 0;
        size_t start = 0;
        for (size_t dot = ip.find('.'); dot != string::npos; dot = ip.find('.', start)) {
            x = x * 256 + stoll(ip.substr(start, dot - start));
            start = dot + 1;
        }
        x = x * 256 + stoll(ip.substr(start));
        vector<string> blocks;
        while (n > 0) {
            // A block of 2^k addresses must start at an address divisible
            // by 2^k, and may not overrun the remaining count. So the
            // largest block at x is its lowest set bit (its own alignment),
            // halved down until it fits n; at address 0 nothing is set, so
            // the whole 2^32 space aligns and only n caps the block.
            long long block = (x & -x) != 0 ? x & -x : 1LL << 32;
            while (block > n) {
                block >>= 1;
            }
            int prefix = 32 - __builtin_ctzll(block);
            blocks.push_back(to_string(x >> 24) + "." + to_string((x >> 16) & 255) + "." + to_string((x >> 8) & 255) +
                             "." + to_string(x & 255) + "/" + to_string(prefix));
            x += block;
            n -= (int)block;
        }
        return blocks;
    }
};
