#include <functional>
#include <queue>
#include <vector>

class KthLargest {
  public:
    // Min-heap holding exactly the k largest scores seen so far: the heap
    // minimum is the kth largest element of the whole pool.
    KthLargest(int k, std::vector<int> nums) : k(k) {
        for (int value : nums) {
            heap.push(value);
        }
        while ((int)heap.size() > k) {
            heap.pop();
        }
    }

    int add(int val) {
        // Push first, then evict: a value smaller than the root pops right
        // back out, so no comparison branch is needed.
        heap.push(val);
        if ((int)heap.size() > k) {
            heap.pop();
        }
        return heap.top();
    }

  private:
    int k;
    std::priority_queue<int, std::vector<int>, std::greater<int>> heap;
};
