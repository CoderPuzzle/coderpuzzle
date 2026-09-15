#include <string>
#include <unordered_map>
#include <vector>

// A prefix trie whose every node on a key's path carries the sum of the
// current values of all live keys passing through it: insert() adds the
// key's CHANGE in value along its path -- a side map remembers the previous
// value, so overwriting a key corrects the running totals instead of
// double-counting -- and sum() walks the prefix and returns the node's
// total, or 0 when the walk falls off the trie. Nodes live in a pool and
// are named by index; node 0 is the root, so 0 doubles as "no child".
class MapSum {
  public:
    MapSum() {}

    void insert(string key, int val) {
        long long delta = val - values[key];
        values[key] = val;
        int node = 0;
        for (char letter : key) {
            int child = nodes[node].next[letter];
            if (child == 0) {
                child = (int)nodes.size();
                nodes[node].next[letter] = child;
                nodes.emplace_back();
            }
            node = child;
            nodes[node].score += delta;
        }
    }

    int sum(string prefix) {
        int node = 0;
        for (char letter : prefix) {
            auto found = nodes[node].next.find(letter);
            if (found == nodes[node].next.end()) {
                return 0;
            }
            node = found->second;
        }
        return (int)nodes[node].score;
    }

  private:
    struct Node {
        unordered_map<char, int> next;
        long long score = 0;
    };

    vector<Node> nodes = vector<Node>(1);
    unordered_map<string, int> values;
};
