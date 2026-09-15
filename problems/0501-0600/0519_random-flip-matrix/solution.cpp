class Solution {
  public:
    Solution(int m, int n) : columns_(n), total_(m * n), remaining_(m * n) {}

    vector<int> flip() {
        int index = static_cast<int>(engine_() % remaining_);
        auto found = mapping_.find(index);
        int value = found != mapping_.end() ? found->second : index;
        int last = remaining_ - 1;
        auto lastFound = mapping_.find(last);
        int lastValue = lastFound != mapping_.end() ? lastFound->second : last;
        mapping_.erase(last);
        if (index != last) {
            mapping_[index] = lastValue;
        }
        remaining_ = last;
        return {value / columns_, value % columns_};
    }

    void reset() {
        remaining_ = total_;
        mapping_.clear();
    }

  private:
    int columns_;
    int total_;
    int remaining_;
    unordered_map<int, int> mapping_;
    std::mt19937 engine_{519u};
};
