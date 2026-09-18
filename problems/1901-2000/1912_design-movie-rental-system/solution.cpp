#include <functional>
#include <queue>
#include <unordered_map>
#include <utility>
#include <vector>

namespace {

// One unrented copy on a movie's shelf.
struct ShelfEntry {
    int price;
    int shop;
    long long token;
};

struct ShelfWorse {
    // "greater" ordering turns std::priority_queue into a min-heap.
    bool operator()(const ShelfEntry &a, const ShelfEntry &b) const {
        if (a.price != b.price) {
            return a.price > b.price;
        }
        return a.shop > b.shop;
    }
};

// One rented copy, competing globally by price then shop then movie.
struct RentedEntry {
    int price;
    int shop;
    int movie;
    long long token;
};

struct RentedWorse {
    bool operator()(const RentedEntry &a, const RentedEntry &b) const {
        if (a.price != b.price) {
            return a.price > b.price;
        }
        if (a.shop != b.shop) {
            return a.shop > b.shop;
        }
        return a.movie > b.movie;
    }
};

// One physical copy — the movie at a shop — packed into a single key.
long long pack(int shop, int movie) { return shop * 100001LL + movie; }

} // namespace

class MovieRentingSystem {
  public:
    MovieRentingSystem(int n, std::vector<std::vector<int>> entries) {
        for (const std::vector<int> &entry : entries) {
            int shop = entry[0];
            int movie = entry[1];
            int price = entry[2];
            price_.emplace(pack(shop, movie), price);
            serial_++;
            unrentedToken_[pack(shop, movie)] = serial_;
            unrented_[movie].push(ShelfEntry{price, shop, serial_});
        }
    }

    std::vector<int> search(int movie) {
        std::vector<int> result;
        auto found = unrented_.find(movie);
        if (found == unrented_.end()) {
            return result;
        }
        auto &shelf = found->second;
        std::vector<ShelfEntry> kept;
        while (!shelf.empty() && (int)result.size() < 5) {
            ShelfEntry top = shelf.top();
            shelf.pop();
            auto live = unrentedToken_.find(pack(top.shop, movie));
            if (live == unrentedToken_.end() || live->second != top.token) {
                continue; // stale entry from a rent/handBack cycle
            }
            result.push_back(top.shop);
            kept.push_back(top);
        }
        for (const ShelfEntry &entry : kept) {
            shelf.push(entry);
        }
        return result;
    }

    void rent(int shop, int movie) {
        unrentedToken_.erase(pack(shop, movie));
        serial_++;
        rentedToken_[pack(shop, movie)] = serial_;
        rented_.push(RentedEntry{price_[pack(shop, movie)], shop, movie, serial_});
    }

    void drop(int shop, int movie) {
        rentedToken_.erase(pack(shop, movie));
        serial_++;
        unrentedToken_[pack(shop, movie)] = serial_;
        unrented_[movie].push(ShelfEntry{price_[pack(shop, movie)], shop, serial_});
    }

    std::vector<std::vector<int>> report() {
        std::vector<std::vector<int>> result;
        std::vector<RentedEntry> kept;
        while (!rented_.empty() && (int)result.size() < 5) {
            RentedEntry top = rented_.top();
            rented_.pop();
            auto live = rentedToken_.find(pack(top.shop, top.movie));
            if (live == rentedToken_.end() || live->second != top.token) {
                continue;
            }
            result.push_back({top.shop, top.movie});
            kept.push_back(top);
        }
        for (const RentedEntry &entry : kept) {
            rented_.push(entry);
        }
        return result;
    }

  private:
    std::unordered_map<long long, int> price_;
    std::unordered_map<int, std::priority_queue<ShelfEntry, std::vector<ShelfEntry>, ShelfWorse>> unrented_;
    std::unordered_map<long long, long long> unrentedToken_;
    std::priority_queue<RentedEntry, std::vector<RentedEntry>, RentedWorse> rented_;
    std::unordered_map<long long, long long> rentedToken_;
    long long serial_ = 0;
};
