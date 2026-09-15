#include <cstddef>
#include <vector>

// A cursor over the runs of the encoding: the iterator never decodes
// anything — next(n) walks forward while the current run's remaining count
// is smaller than n, spending each exhausted run's remainder on n as it
// passes, then decrements the first run rich enough to supply the n-th
// element and returns that run's value.
class RLEIterator {
  public:
    RLEIterator(std::vector<int> encoding) : a(std::move(encoding)) {}

    int next(int n) {
        // Walk forward while the current run cannot supply the n-th element;
        // a run of length zero never stops this walk (0 is smaller than any n).
        while (i < a.size() && a[i] < n) {
            n -= a[i];
            i += 2;
        }
        if (i >= a.size()) {
            // The walk ran off the end: the n-th element does not exist, and
            // every remaining run was consumed along the way.
            return -1;
        }
        a[i] -= n;
        return a[i + 1];
    }

  private:
    std::vector<int> a;
    std::size_t i = 0;
};
