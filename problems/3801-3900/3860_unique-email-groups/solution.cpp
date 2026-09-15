#include <cctype>
#include <string>
#include <unordered_set>
#include <vector>

using namespace std;

class Solution {
  public:
    int uniqueEmailGroups(vector<string> &emails) {
        // A group is identified by its normalized address: the local part
        // loses its dots and anything from the first '+', then both parts
        // are lowercased.
        unordered_set<string> seen;
        for (const string &email : emails) {
            size_t at = email.find('@');
            string local = email.substr(0, at);
            size_t plus = local.find('+');
            if (plus != string::npos) {
                local = local.substr(0, plus);
            }
            string domain = email.substr(at + 1);
            for (char &c : local) {
                c = tolower(c);
            }
            for (char &c : domain) {
                c = tolower(c);
            }
            string key;
            for (char c : local) {
                if (c != '.') {
                    key += c;
                }
            }
            key += '@';
            key += domain;
            seen.insert(key);
        }
        return (int)seen.size();
    }
};
