#include <list>
#include <unordered_map>

class LRUCache {
  public:
    LRUCache(int capacity) : capacity(capacity) {}

    int get(int key) {
        auto found = nodes.find(key);
        if (found == nodes.end()) {
            return -1;
        }
        order.splice(order.begin(), order, found->second);
        return found->second->second;
    }

    void put(int key, int value) {
        auto found = nodes.find(key);
        if (found != nodes.end()) {
            found->second->second = value;
            order.splice(order.begin(), order, found->second);
            return;
        }
        order.emplace_front(key, value);
        nodes[key] = order.begin();
        if ((int)nodes.size() > capacity) {
            nodes.erase(order.back().first);
            order.pop_back();
        }
    }

  private:
    int capacity;
    std::list<std::pair<int, int>> order;
    std::unordered_map<int, std::list<std::pair<int, int>>::iterator> nodes;
};
