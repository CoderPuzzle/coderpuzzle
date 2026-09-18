#include <algorithm>
#include <map>
#include <string>
#include <utility>
#include <vector>

class AutocompleteSystem {
  public:
    AutocompleteSystem(std::vector<std::string> sentences, std::vector<int> times) {
        current = root;
        for (size_t index = 0; index < sentences.size(); index++) {
            insert(sentences[index], times[index]);
        }
    }

    std::vector<std::string> input(std::string c) {
        if (c == "#") {
            insert(typed, 1);
            typed.clear();
            current = root;
            return {};
        }
        typed += c;
        for (char byte : c) {
            if (current == nullptr) {
                break;
            }
            auto child = current->children.find(byte);
            current = child == current->children.end() ? nullptr : child->second;
        }
        if (current == nullptr) {
            return {};
        }
        std::vector<std::pair<std::string, int>> matches;
        std::string prefix = typed;
        collect(current, prefix, matches);
        std::sort(matches.begin(), matches.end(), [](const auto &a, const auto &b) {
            if (a.second != b.second) {
                return a.second > b.second; // hotter first
            }
            return a.first < b.first; // then the smaller sentence
        });
        std::vector<std::string> top;
        for (size_t index = 0; index < matches.size() && index < 3; index++) {
            top.push_back(matches[index].first);
        }
        return top;
    }

  private:
    struct Node {
        std::map<char, Node *> children; // byte order equals character order
        int hotness = 0;
    };

    Node *insert(const std::string &sentence, int extra) {
        Node *node = root;
        for (char byte : sentence) {
            Node *&child = node->children[byte];
            if (child == nullptr) {
                child = new Node();
            }
            node = child;
        }
        node->hotness += extra;
        return node;
    }

    void collect(Node *node, std::string &prefix, std::vector<std::pair<std::string, int>> &matches) {
        if (node->hotness > 0) {
            matches.emplace_back(prefix, node->hotness);
        }
        for (auto &[byte, child] : node->children) {
            prefix.push_back(byte);
            collect(child, prefix, matches);
            prefix.pop_back();
        }
    }

    Node *root = new Node();
    Node *current = nullptr;
    std::string typed;
};
