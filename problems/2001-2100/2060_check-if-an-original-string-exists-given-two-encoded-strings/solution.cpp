class Solution {
  public:
    bool possiblyEquals(string s1, string s2) {
        unordered_map<long long, char> memo;
        return search(0, 0, 0, s1, s2, memo);
    }

  private:
    long long stateKey(int i, int j, int difference) {
        return (static_cast<long long>(i) << 48) | (static_cast<long long>(j) << 32) |
               static_cast<unsigned int>(difference);
    }

    bool search(int i, int j, int difference, const string &s1, const string &s2,
                unordered_map<long long, char> &memo) {
        long long key = stateKey(i, j, difference);
        auto found = memo.find(key);
        if (found != memo.end()) {
            return found->second == 2;
        }
        if (i == static_cast<int>(s1.size()) && j == static_cast<int>(s2.size())) {
            return difference == 0;
        }

        if (i < static_cast<int>(s1.size()) && isdigit(s1[i])) {
            int value = 0;
            for (int end = i; end < static_cast<int>(s1.size()) && end < i + 3 && isdigit(s1[end]); ++end) {
                value = value * 10 + s1[end] - '0';
                if (search(end + 1, j, difference + value, s1, s2, memo)) {
                    memo[key] = 2;
                    return true;
                }
            }
        }

        if (j < static_cast<int>(s2.size()) && isdigit(s2[j])) {
            int value = 0;
            for (int end = j; end < static_cast<int>(s2.size()) && end < j + 3 && isdigit(s2[end]); ++end) {
                value = value * 10 + s2[end] - '0';
                if (search(i, end + 1, difference - value, s1, s2, memo)) {
                    memo[key] = 2;
                    return true;
                }
            }
        }

        bool answer = false;
        if (difference > 0 && j < static_cast<int>(s2.size()) && isalpha(s2[j])) {
            answer = search(i, j + 1, difference - 1, s1, s2, memo);
        } else if (difference < 0 && i < static_cast<int>(s1.size()) && isalpha(s1[i])) {
            answer = search(i + 1, j, difference + 1, s1, s2, memo);
        } else if (difference == 0 && i < static_cast<int>(s1.size()) && j < static_cast<int>(s2.size()) &&
                   isalpha(s1[i]) && isalpha(s2[j]) && s1[i] == s2[j]) {
            answer = search(i + 1, j + 1, 0, s1, s2, memo);
        }
        memo[key] = answer ? 2 : 1;
        return answer;
    }
};
