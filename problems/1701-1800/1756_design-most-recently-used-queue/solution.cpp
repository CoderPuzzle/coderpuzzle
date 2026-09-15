#include <algorithm>
#include <cmath>
#include <vector>

// The queue lives in consecutive blocks of about sqrt(n) slots: fetch
// walks the blocks, subtracting each size from k, to find the kth
// element, lifts it out of its own block, and re-appends it at the tail
// — an empty block is dropped, a full tail rolls the value into a fresh
// block.
class MRUQueue {
  public:
    MRUQueue(int n) : width_(static_cast<int>(std::sqrt(n)) + 1) {
        for (int start = 1; start <= n; start += width_) {
            int end = std::min(start + width_, n + 1);
            std::vector<int> block;
            block.reserve(width_);
            for (int value = start; value < end; value++) {
                block.push_back(value);
            }
            blocks_.push_back(std::move(block));
        }
    }

    int fetch(int k) {
        size_t index = 0;
        while (k > static_cast<int>(blocks_[index].size())) {
            k -= static_cast<int>(blocks_[index].size());
            index++;
        }
        std::vector<int> &block = blocks_[index];
        int value = block[k - 1];
        block.erase(block.begin() + (k - 1));
        if (block.empty()) {
            blocks_.erase(blocks_.begin() + static_cast<std::ptrdiff_t>(index));
        }
        if (blocks_.empty() || blocks_.back().size() >= static_cast<size_t>(width_)) {
            blocks_.push_back({value});
        } else {
            blocks_.back().push_back(value);
        }
        return value;
    }

  private:
    std::vector<std::vector<int>> blocks_;
    int width_;
};
