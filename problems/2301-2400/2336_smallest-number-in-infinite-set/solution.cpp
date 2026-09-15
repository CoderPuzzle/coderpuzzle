#include <set>

class SmallestInfiniteSet {
  public:
    SmallestInfiniteSet() : next_new_(1) {}

    int popSmallest() {
        if (!added_back_.empty()) {
            int value = *added_back_.begin();
            added_back_.erase(added_back_.begin());
            return value;
        }
        return next_new_++;
    }

    void addBack(int num) {
        // Only values already popped can be added back.
        if (num < next_new_) {
            added_back_.insert(num);
        }
    }

  private:
    // Everything below next_new_ has been popped at least once; a
    // removed value is present again exactly when it sits in this set.
    // Values >= next_new_ have never been touched.
    int next_new_;
    std::set<int> added_back_;
};
