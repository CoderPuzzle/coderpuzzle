class Solution {
  public:
    int numUniqueEmails(vector<string> &emails) {
        unordered_set<string> distinct;
        string normalized;
        for (const auto &email : emails) {
            normalized.clear();
            bool ignored = false;
            for (size_t i = 0; i < email.size(); ++i) {
                char ch = email[i];
                if (ch == '@') {
                    // The domain is untouched: take it verbatim from '@' on.
                    normalized.append(email, i, string::npos);
                    break;
                }
                if (ignored)
                    continue; // everything after the first '+' is dropped
                if (ch == '.')
                    continue; // dots in the local name vanish
                if (ch == '+') {
                    ignored = true;
                    continue;
                }
                normalized.push_back(ch);
            }
            distinct.insert(normalized);
        }
        return (int)distinct.size();
    }
};
