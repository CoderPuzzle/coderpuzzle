class LockingTree {
  public:
    // Owner per node (-1 = unlocked) plus children adjacency built from
    // the parent array; upgrade enumerates descendants with an explicit
    // stack so a 2000-node chain is never recursed into.
    LockingTree(vector<int> &parent) : parent_(parent), owner_(parent.size(), -1) {
        children_.resize(parent.size());
        for (int node = 1; node < (int)parent.size(); ++node)
            children_[parent[node]].push_back(node);
    }

    bool lock(int num, int user) {
        if (owner_[num] != -1)
            return false;
        owner_[num] = user;
        return true;
    }

    bool unlock(int num, int user) {
        if (owner_[num] != user)
            return false;
        owner_[num] = -1;
        return true;
    }

    bool upgrade(int num, int user) {
        // Condition 1: the node itself must be unlocked.
        if (owner_[num] != -1)
            return false;
        // Condition 3: no ancestor may be locked.
        for (int node = parent_[num]; node != -1; node = parent_[node])
            if (owner_[node] != -1)
                return false;
        // Condition 2: at least one locked descendant. Collect every
        // descendant iteratively so the check and the later unlock share
        // one traversal.
        vector<int> descendants;
        vector<int> stack = children_[num];
        bool has_locked = false;
        while (!stack.empty()) {
            int node = stack.back();
            stack.pop_back();
            descendants.push_back(node);
            if (owner_[node] != -1)
                has_locked = true;
            stack.insert(stack.end(), children_[node].begin(), children_[node].end());
        }
        if (!has_locked)
            return false;
        owner_[num] = user;
        for (int node : descendants)
            owner_[node] = -1;
        return true;
    }

  private:
    vector<int> parent_;
    vector<int> owner_;
    vector<vector<int>> children_;
};
