package main

// One cache entry, living in the LRU list of its frequency bucket.
type cacheNode struct {
	key    int
	value  int
	freq   int
	bucket *freqBucket
	prev   *cacheNode
	next   *cacheNode
}

// One frequency: an LRU list of nodes (head side = least recent) plus
// links to the neighbouring frequencies. The first real bucket is
// always the minimum frequency.
type freqBucket struct {
	freq int
	head *cacheNode // sentinel before the least recent node
	tail *cacheNode // sentinel after the most recent node
	prev *freqBucket
	next *freqBucket
}

func newFreqBucket(freq int) *freqBucket {
	bucket := &freqBucket{freq: freq, head: &cacheNode{}, tail: &cacheNode{}}
	bucket.head.next = bucket.tail
	bucket.tail.prev = bucket.head
	return bucket
}

// Frequency buckets in a doubly linked list, each bucket an LRU list.
// The first real bucket is always the minimum frequency, so eviction
// reads its head-side node; a use moves the node to the bucket one
// frequency up, creating that bucket exactly where it belongs if it
// is missing.
type LFUCache struct {
	capacity int
	nodes    map[int]*cacheNode
	first    *freqBucket // sentinel before the lowest frequency
	last     *freqBucket // sentinel after the highest frequency
}

func NewLFUCacheTyped(capacity int) *LFUCache {
	first, last := newFreqBucket(0), newFreqBucket(0)
	first.next = last
	last.prev = first
	return &LFUCache{capacity: capacity, nodes: map[int]*cacheNode{}, first: first, last: last}
}

func (cache *LFUCache) unlinkNode(node *cacheNode) {
	node.prev.next = node.next
	node.next.prev = node.prev
}

func (cache *LFUCache) pushNode(bucket *freqBucket, node *cacheNode) {
	tail := bucket.tail.prev
	node.prev = tail
	node.next = bucket.tail
	tail.next = node
	bucket.tail.prev = node
	node.bucket = bucket
}

func (cache *LFUCache) unlinkBucket(bucket *freqBucket) {
	bucket.prev.next = bucket.next
	bucket.next.prev = bucket.prev
}

func (cache *LFUCache) addBucketAfter(anchor *freqBucket, bucket *freqBucket) {
	following := anchor.next
	bucket.prev = anchor
	bucket.next = following
	anchor.next = bucket
	following.prev = bucket
}

// A use moves the node to the bucket one frequency up, creating that
// bucket exactly where it belongs if it is missing.
func (cache *LFUCache) bump(node *cacheNode) {
	old := node.bucket
	following := old.next
	cache.unlinkNode(node)
	var target *freqBucket
	if following.freq == node.freq+1 {
		target = following
	} else {
		target = newFreqBucket(node.freq + 1)
		cache.addBucketAfter(old, target)
	}
	node.freq++
	cache.pushNode(target, node)
	if old.head.next == old.tail {
		cache.unlinkBucket(old)
	}
}

func (cache *LFUCache) get(key int) int {
	node, exists := cache.nodes[key]
	if !exists {
		return -1
	}
	cache.bump(node)
	return node.value
}

func (cache *LFUCache) put(key int, value int) {
	if node, exists := cache.nodes[key]; exists {
		node.value = value
		cache.bump(node)
		return
	}
	if len(cache.nodes) == cache.capacity {
		victimBucket := cache.first.next
		victim := victimBucket.head.next
		cache.unlinkNode(victim)
		delete(cache.nodes, victim.key)
		if victimBucket.head.next == victimBucket.tail {
			cache.unlinkBucket(victimBucket)
		}
	}
	node := &cacheNode{key: key, value: value, freq: 1}
	cache.nodes[key] = node
	first := cache.first.next
	var target *freqBucket
	if first.freq == 1 {
		target = first
	} else {
		target = newFreqBucket(1)
		cache.addBucketAfter(cache.first, target)
	}
	cache.pushNode(target, node)
}
