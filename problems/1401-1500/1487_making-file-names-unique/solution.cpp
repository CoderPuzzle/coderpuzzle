#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    std::vector<std::string> getFolderNames(std::vector<std::string> &names) {
        std::unordered_set<std::string> used;
        std::unordered_map<std::string, long long> nextK;
        std::vector<std::string> result;
        result.reserve(names.size());
        for (const std::string &name : names) {
            if (!used.count(name)) {
                used.insert(name);
                if (!nextK.count(name)) {
                    nextK[name] = 1;
                }
                result.push_back(name);
                continue;
            }
            const std::string &base = name;
            long long k = nextK.count(base) ? nextK[base] : 1;
            std::string candidate = base + "(" + std::to_string(k) + ")";
            while (used.count(candidate)) {
                ++k;
                candidate = base + "(" + std::to_string(k) + ")";
            }
            used.insert(candidate);
            nextK[base] = k + 1;
            size_t idx = candidate.rfind('(');
            if (idx != std::string::npos && idx > 0 && candidate.back() == ')') {
                bool numeric = true;
                long long value = 0;
                for (size_t p = idx + 1; p + 1 < candidate.size(); ++p) {
                    char c = candidate[p];
                    if (c < '0' || c > '9') {
                        numeric = false;
                        break;
                    }
                    value = value * 10 + (c - '0');
                }
                if (numeric && candidate.size() - idx - 1 > 0) {
                    std::string stem = candidate.substr(0, idx);
                    long long val = value + 1;
                    long long cur = nextK.count(stem) ? nextK[stem] : 1;
                    if (cur < val)
                        nextK[stem] = val;
                }
            }
            result.push_back(candidate);
        }
        return result;
    }
};
