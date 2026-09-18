class StreamChecker {
  public:
    StreamChecker(vector<string> words) {
        nodes.emplace_back(); // the root: index 0
        for (const string &word : words) {
            int node = 0;
            for (char letter : word) {
                int child;
                auto found = nodes[node].children.find(letter);
                if (found != nodes[node].children.end()) {
                    child = found->second;
                } else {
                    child = (int)nodes.size();
                    nodes.emplace_back();
                    nodes[node].children[letter] = child;
                }
                node = child;
            }
            nodes[node].word = true;
        }
        trail.push_back(0);
    }

    bool query(string letter) {
        vector<int> advanced;
        bool hit = false;
        for (int node : trail) { // index 0 is always the root
            auto found = nodes[node].children.find(letter[0]);
            if (found != nodes[node].children.end()) {
                advanced.push_back(found->second);
                hit = hit || nodes[found->second].word;
            }
        }
        advanced.push_back(0); // a fresh suffix begins every feed
        trail = advanced;
        return hit;
    }

  private:
    struct Node {
        unordered_map<char, int> children;
        bool word = false;
    };
    vector<Node> nodes; // arena: reallocation is safe, edges are indices
    vector<int> trail;  // trie nodes the live attempts sit on
};
