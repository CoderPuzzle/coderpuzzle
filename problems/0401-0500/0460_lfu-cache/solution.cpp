#include <unordered_map>

class LFUCache {
  private:
    struct Bucket;

    // One cache entry, living in the LRU list of its frequency bucket.
    struct Node {
        int key = -1;
        int value = -1;
        int freq = 1;
        Node *prev = nullptr;
        Node *next = nullptr;
        Bucket *bucket = nullptr;
    };

    // One frequency: an LRU list of nodes (head side = least recent)
    // plus links to the neighbouring frequencies. The first real bucket
    // is always the minimum frequency.
    struct Bucket {
        int freq;
        Node head; // sentinel before the least recent node
        Node tail; // sentinel after the most recent node
        Bucket *prev = nullptr;
        Bucket *next = nullptr;

        explicit Bucket(int freq) : freq(freq) {
            head.next = &tail;
            tail.prev = &head;
        }
    };

  public:
    LFUCache(int capacity) : capacity(capacity) {
        first->next = last;
        last->prev = first;
    }

    int get(int key) {
        auto found = nodes.find(key);
        if (found == nodes.end()) {
            return -1;
        }
        bump(found->second);
        return found->second->value;
    }

    void put(int key, int value) {
        auto found = nodes.find(key);
        if (found != nodes.end()) {
            found->second->value = value;
            bump(found->second);
            return;
        }
        if ((int)nodes.size() == capacity) {
            Bucket *victimBucket = first->next;
            Node *victim = victimBucket->head.next;
            unlinkNode(victim);
            nodes.erase(victim->key);
            delete victim;
            if (victimBucket->head.next == &victimBucket->tail) {
                unlinkBucket(victimBucket);
                delete victimBucket;
            }
        }
        Node *created = new Node();
        created->key = key;
        created->value = value;
        nodes[key] = created;
        Bucket *firstBucket = first->next;
        Bucket *target = firstBucket->freq == 1 ? firstBucket : bucketAfter(first, 1);
        pushNode(target, created);
    }

  private:
    int capacity;
    std::unordered_map<int, Node *> nodes;
    Bucket *first = new Bucket(0); // sentinel before the lowest frequency
    Bucket *last = new Bucket(0);  // sentinel after the highest frequency

    void unlinkNode(Node *node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void pushNode(Bucket *bucket, Node *node) {
        Node *tail = bucket->tail.prev;
        node->prev = tail;
        node->next = &bucket->tail;
        tail->next = node;
        bucket->tail.prev = node;
        node->bucket = bucket;
    }

    void unlinkBucket(Bucket *bucket) {
        bucket->prev->next = bucket->next;
        bucket->next->prev = bucket->prev;
    }

    void addBucketAfter(Bucket *anchor, Bucket *bucket) {
        Bucket *following = anchor->next;
        bucket->prev = anchor;
        bucket->next = following;
        anchor->next = bucket;
        following->prev = bucket;
    }

    Bucket *bucketAfter(Bucket *anchor, int freq) {
        Bucket *bucket = new Bucket(freq);
        addBucketAfter(anchor, bucket);
        return bucket;
    }

    // A use moves the node to the bucket one frequency up, creating
    // that bucket exactly where it belongs if it is missing.
    void bump(Node *node) {
        Bucket *old = node->bucket;
        Bucket *following = old->next;
        unlinkNode(node);
        Bucket *target = following->freq == node->freq + 1 ? following : bucketAfter(old, node->freq + 1);
        node->freq += 1;
        pushNode(target, node);
        if (old->head.next == &old->tail) {
            unlinkBucket(old);
            delete old;
        }
    }
};
