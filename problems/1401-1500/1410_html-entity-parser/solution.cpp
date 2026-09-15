#include <string>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    std::string entityParser(std::string text) {
        std::unordered_map<std::string, char> entities = {
            {"&quot;", '"'}, {"&apos;", '\''}, {"&amp;", '&'}, {"&gt;", '>'}, {"&lt;", '<'}, {"&frasl;", '/'},
        };
        std::string result;
        result.reserve(text.size());
        int i = 0;
        int n = (int)text.size();
        while (i < n) {
            if (text[i] == '&') {
                bool matched = false;
                for (const auto &pair : entities) {
                    const std::string &entity = pair.first;
                    if (text.compare(i, entity.size(), entity) == 0) {
                        result.push_back(pair.second);
                        i += (int)entity.size();
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    result.push_back(text[i]);
                    i++;
                }
            } else {
                result.push_back(text[i]);
                i++;
            }
        }
        return result;
    }
};
