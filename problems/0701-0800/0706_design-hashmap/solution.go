package main

// A fixed array of 1009 buckets -- 1009 is prime, so key patterns that
// repeat modulo a small number do not all pile into one bucket -- each
// holding a small list of key/value pairs. A key's remainder picks its
// bucket, and put, get and remove each scan that bucket alone: put replaces
// the value of an existing pair in place (never a duplicate), get returns
// the stored value or -1, and remove deletes the pair when present.
const hashMapBucketCount = 1009

type hashMapPair struct {
	key   int
	value int
}

type MyHashMap struct {
	buckets [][]hashMapPair
}

func NewMyHashMapTyped() *MyHashMap {
	return &MyHashMap{buckets: make([][]hashMapPair, hashMapBucketCount)}
}

func (design *MyHashMap) put(key int, value int) {
	bucket := design.buckets[key%hashMapBucketCount]
	for index := range bucket {
		if bucket[index].key == key {
			bucket[index].value = value
			return
		}
	}
	design.buckets[key%hashMapBucketCount] = append(bucket, hashMapPair{key: key, value: value})
}

func (design *MyHashMap) get(key int) int {
	for _, pair := range design.buckets[key%hashMapBucketCount] {
		if pair.key == key {
			return pair.value
		}
	}
	return -1
}

func (design *MyHashMap) remove(key int) {
	bucket := design.buckets[key%hashMapBucketCount]
	for index := range bucket {
		if bucket[index].key == key {
			design.buckets[key%hashMapBucketCount] = append(bucket[:index], bucket[index+1:]...)
			return
		}
	}
}
