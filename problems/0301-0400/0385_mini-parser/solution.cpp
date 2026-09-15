#include <vector>

class Solution {
  public:
    NestedInteger deserialize(string s) {
        if (s[0] != '[') {
            NestedInteger leaf;
            leaf.setInteger(stoll(s));
            return leaf;
        }
        std::vector<NestedInteger> stack;
        stack.emplace_back();
        NestedInteger root;
        size_t index = 1;
        while (index < s.size()) {
            char ch = s[index];
            if (ch == '[') {
                stack.emplace_back();
                ++index;
            } else if (ch == ']') {
                NestedInteger node = std::move(stack.back());
                stack.pop_back();
                if (stack.empty())
                    root = std::move(node);
                else
                    stack.back().add(node);
                ++index;
            } else if (ch == ',') {
                ++index;
            } else {
                size_t start = index;
                while (s[index] != ',' && s[index] != ']')
                    ++index;
                NestedInteger leaf;
                leaf.setInteger(stoll(s.substr(start, index - start)));
                stack.back().add(leaf);
            }
        }
        return root;
    }
};
