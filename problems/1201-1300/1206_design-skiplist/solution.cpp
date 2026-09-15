#include <cstdlib>
#include <vector>

// A skiplist: a stack of sorted singly-linked layers, each skipping over
// roughly half the elements below. add promotes a node to a random level
// (geometric, p = 1/2) and splices it into every layer it occupies;
// search/erase descend from the top layer, always moving to the rightmost
// node whose value stays below the target, so each touches O(log n) nodes.
class Skiplist {
  public:
    Skiplist() { head = new Node(-1, MAX_LEVEL); }

    bool search(int target) {
        Node *cur = head;
        for (int i = MAX_LEVEL - 1; i >= 0; --i) {
            while (cur->next[i] && cur->next[i]->val < target) {
                cur = cur->next[i];
            }
        }
        cur = cur->next[0];
        return cur && cur->val == target;
    }

    void add(int num) {
        vector<Node *> update = predecessors(num);
        Node *node = new Node(num, random_level());
        // Splice into each layer the node actually occupies.
        for (int i = 0; i < (int)node->next.size(); ++i) {
            node->next[i] = update[i]->next[i];
            update[i]->next[i] = node;
        }
    }

    bool erase(int num) {
        vector<Node *> update = predecessors(num);
        Node *cur = update[0]->next[0];
        if (!cur || cur->val != num) {
            return false;
        }
        // Unlink cur only where it is the immediate next node; at higher
        // layers a duplicate with more levels may take over.
        for (int i = 0; i < MAX_LEVEL; ++i) {
            if (update[i]->next[i] == cur) {
                update[i]->next[i] = cur->next[i];
            }
        }
        return true;
    }

  private:
    struct Node {
        int val;
        vector<Node *> next;
        Node(int value, int level) : val(value), next(level, nullptr) {}
    };
    static const int MAX_LEVEL = 16;
    Node *head;

    // The rightmost node strictly below target at each layer.
    vector<Node *> predecessors(int target) {
        vector<Node *> update(MAX_LEVEL, nullptr);
        Node *cur = head;
        for (int i = MAX_LEVEL - 1; i >= 0; --i) {
            while (cur->next[i] && cur->next[i]->val < target) {
                cur = cur->next[i];
            }
            update[i] = cur;
        }
        return update;
    }

    int random_level() {
        int level = 1;
        while (rand() % 2 == 0 && level < MAX_LEVEL) {
            ++level;
        }
        return level;
    }
};
