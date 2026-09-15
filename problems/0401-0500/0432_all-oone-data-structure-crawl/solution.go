// One bucket per count — the count plus the keys at it — threaded on a
// doubly-linked list kept in ascending count order; every inc/dec walks its
// key exactly one bucket over, splicing the neighboring count in when it is
// missing and dropping buckets that empty out, so the extremes sit at the
// list's ends.
type bucket struct {
	count int
	keys  map[string]struct{}
	prev  *bucket
	next  *bucket
}

type AllOne struct {
	head      *bucket // sentinel below every real count
	tail      *bucket // sentinel above every real count
	keyBucket map[string]*bucket
}

func NewAllOneTyped() *AllOne {
	head := &bucket{count: 0, keys: map[string]struct{}{}}
	tail := &bucket{count: 0, keys: map[string]struct{}{}}
	head.next, tail.prev = tail, head
	return &AllOne{head: head, tail: tail, keyBucket: map[string]*bucket{}}
}

func (design *AllOne) insertAfter(anchor *bucket, count int) *bucket {
	node := &bucket{count: count, keys: map[string]struct{}{}}
	node.prev, node.next = anchor, anchor.next
	anchor.next.prev = node
	anchor.next = node
	return node
}

func drop(node *bucket) {
	node.prev.next = node.next
	node.next.prev = node.prev
}

func pinned(node *bucket) string {
	// Several keys may share the extreme count; the lexicographically
	// smallest of them is the pinned answer.
	best := ""
	for key := range node.keys {
		if best == "" || key < best {
			best = key
		}
	}
	return best
}

func (design *AllOne) inc(key string) {
	old := design.keyBucket[key]
	anchor := design.head
	count := 1
	if old != nil {
		anchor = old
		count = old.count + 1
	}
	// The needed count is exactly one past the anchor's, so only its
	// immediate successor can already hold it.
	b := anchor.next
	if b.count != count {
		b = design.insertAfter(anchor, count)
	}
	b.keys[key] = struct{}{}
	design.keyBucket[key] = b
	if old != nil {
		delete(old.keys, key)
		if len(old.keys) == 0 {
			drop(old)
		}
	}
}

func (design *AllOne) dec(key string) {
	old := design.keyBucket[key] // the statement guarantees presence
	delete(design.keyBucket, key)
	if old.count > 1 {
		count := old.count - 1
		b := old.prev
		if b.count != count {
			b = design.insertAfter(old.prev, count)
		}
		b.keys[key] = struct{}{}
		design.keyBucket[key] = b
	}
	delete(old.keys, key)
	if len(old.keys) == 0 {
		drop(old)
	}
}

func (design *AllOne) getMaxKey() string {
	b := design.tail.prev
	if b == design.head {
		return ""
	}
	return pinned(b)
}

func (design *AllOne) getMinKey() string {
	b := design.head.next
	if b == design.tail {
		return ""
	}
	return pinned(b)
}
