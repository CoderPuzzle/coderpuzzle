class Solution {
  public:
    vector<string> splitMessage(string message, int limit) {
        // digit_len[i] = total decimal digit count of integers 1..i, so
        // each candidate part count b costs O(1) instead of O(b).
        int n = (int)message.size();
        vector<int> digit_len(n + 1, 0);
        for (int x = 1; x <= n; ++x)
            digit_len[x] = digit_len[x - 1] + (int)std::to_string(x).size();
        for (int b = 1; b <= n; ++b) {
            int digits_b = (int)std::to_string(b).size();
            if (2 * digits_b + 3 > limit)
                break; // widest suffix "<b/b>" won't fit
            // Capacity: sum over a=1..b of (limit - len(str(a)) - digits_b - 3).
            int capacity = b * limit - digit_len[b] - b * digits_b - 3 * b;
            if (capacity < n)
                continue;
            vector<string> parts;
            int pos = 0;
            for (int a = 1; a <= b; ++a) {
                string suffix = "<" + std::to_string(a) + "/" + std::to_string(b) + ">";
                int take = std::min(limit - (int)suffix.size(), n - pos);
                parts.push_back(message.substr(pos, take) + suffix);
                pos += take;
            }
            return parts;
        }
        return {};
    }
};
