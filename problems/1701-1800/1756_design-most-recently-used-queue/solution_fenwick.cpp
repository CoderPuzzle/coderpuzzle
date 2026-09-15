#include <algorithm>
#include <vector>

// The line rides a virtual tape: value v starts at tape position v and the
// j-th fetch re-appends its element at position n + j, so tape order is
// always line order. front marks the first live slot of the initial run — a
// sorted hole list remembers the vacated ones — while a Fenwick tree over
// the append stamps counts live elements per position, with a stamp-to-value
// map beside it.
class MRUQueue {
  public:
    MRUQueue(int n) : limit_(n) {
        int step = 1;
        while (step * 2 <= kStamps) {
            step *= 2;
        }
        step_ = step;
    }

    int fetch(int k) {
        int initLive = limit_ - front_ + 1 - static_cast<int>(holes_.size());
        int value;
        if (k <= initLive) {
            int lo = front_, hi = limit_;
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (mid - front_ + 1 - holesUpTo(mid) >= k) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            value = lo;
            holes_.insert(holes_.begin() + holesUpTo(value), value);
            while (!holes_.empty() && holes_.front() == front_) {
                holes_.erase(holes_.begin());
                front_++;
            }
        } else {
            int remaining = k - initLive;
            int pos = 0;
            for (int hop = step_; hop > 0; hop >>= 1) {
                int next = pos + hop;
                if (next <= kStamps && tree_[next] < remaining) {
                    pos = next;
                    remaining -= tree_[next];
                }
            }
            int stamp = pos + 1;
            value = vals_[stamp];
            add(stamp, -1);
        }
        fetches_++;
        vals_[fetches_] = value;
        add(fetches_, 1);
        return value;
    }

  private:
    static constexpr int kStamps = 10000;

    void add(int stamp, int delta) {
        for (; stamp <= kStamps; stamp += stamp & -stamp) {
            tree_[stamp] += delta;
        }
    }

    int holesUpTo(int bound) const {
        return static_cast<int>(std::upper_bound(holes_.begin(), holes_.end(), bound) - holes_.begin());
    }

    std::vector<int> holes_;
    std::vector<int> tree_ = std::vector<int>(kStamps + 1, 0);
    std::vector<int> vals_ = std::vector<int>(kStamps + 1, 0);
    int limit_;
    int front_ = 1;
    int fetches_ = 0;
    int step_ = 1;
};
