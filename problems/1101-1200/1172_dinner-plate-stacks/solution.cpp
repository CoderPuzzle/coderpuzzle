class DinnerPlates {
  private:
    int capacity;
    vector<vector<int>> stacks;
    priority_queue<int, vector<int>, greater<int>> vacant;

  public:
    DinnerPlates(int capacity) : capacity(capacity) {}

    void push(int val) {
        while (!vacant.empty()) {
            int index = vacant.top();
            if (index >= static_cast<int>(stacks.size()) || static_cast<int>(stacks[index].size()) == capacity) {
                vacant.pop();
            } else {
                break;
            }
        }
        if (!vacant.empty()) {
            int index = vacant.top();
            vacant.pop();
            stacks[index].push_back(val);
            if (static_cast<int>(stacks[index].size()) < capacity) {
                vacant.push(index);
            }
        } else if (!stacks.empty() && static_cast<int>(stacks.back().size()) < capacity) {
            stacks.back().push_back(val);
        } else {
            stacks.push_back({val});
        }
    }

    int pop() {
        while (!stacks.empty() && stacks.back().empty()) {
            stacks.pop_back();
        }
        if (stacks.empty()) {
            return -1;
        }
        int value = stacks.back().back();
        stacks.back().pop_back();
        return value;
    }

    int popAtStack(int index) {
        if (index < 0 || index >= static_cast<int>(stacks.size()) || stacks[index].empty()) {
            return -1;
        }
        int value = stacks[index].back();
        stacks[index].pop_back();
        vacant.push(index);
        return value;
    }
};
