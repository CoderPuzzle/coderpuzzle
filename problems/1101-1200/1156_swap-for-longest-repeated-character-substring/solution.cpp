class Solution {
  public:
    int maxRepOpt1(string text) {
        int counts[256] = {0};
        for (char ch : text) {
            counts[(unsigned char)ch] += 1;
        }
        // run-length encode
        vector<pair<char, int>> runs;
        for (char ch : text) {
            if (!runs.empty() && runs.back().first == ch) {
                runs.back().second += 1;
            } else {
                runs.push_back({ch, 1});
            }
        }
        int best = 0;
        for (auto &[ch, length] : runs) {
            best = max(best, min(length + 1, counts[(unsigned char)ch]));
        }
        for (int i = 1; i + 1 < (int)runs.size(); i++) {
            if (runs[i].second == 1 && runs[i - 1].first == runs[i + 1].first) {
                char ch = runs[i - 1].first;
                int combined = runs[i - 1].second + runs[i + 1].second;
                int extra = counts[(unsigned char)ch] > combined ? 1 : 0;
                best = max(best, combined + extra);
            }
        }
        return best;
    }
};
