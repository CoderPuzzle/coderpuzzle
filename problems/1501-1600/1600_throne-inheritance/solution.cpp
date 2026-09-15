#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

class ThroneInheritance {
  public:
    // An n-ary tree keyed by name: children maps a name to its kids in
    // birth order, and dead holds everyone marked deceased. king is
    // remembered as the traversal root.
    ThroneInheritance(string kingName) : king(kingName) { children[kingName] = {}; }

    void birth(string parentName, string childName) {
        children[parentName].push_back(childName);
        children[childName] = {};
    }

    void death(string name) { dead.insert(name); }

    vector<string> getInheritanceOrder() {
        // Iterative pre-order DFS (explicit stack, so depth never risks
        // the call stack — the tree can chain up to 1e5 generations
        // deep). Children go on the stack in reverse so the oldest child
        // is popped, and therefore visited, first.
        vector<string> order;
        vector<string> stack;
        stack.push_back(king);
        while (!stack.empty()) {
            string name = stack.back();
            stack.pop_back();
            if (dead.find(name) == dead.end()) {
                order.push_back(name);
            }
            const vector<string> &kids = children[name];
            for (auto it = kids.rbegin(); it != kids.rend(); ++it) {
                stack.push_back(*it);
            }
        }
        return order;
    }

  private:
    string king;
    unordered_map<string, vector<string>> children;
    unordered_set<string> dead;
};
