package main

import "sort"

// Two maps in lockstep: orders maps orderId -> its packed (type, price)
// key so modify/cancel find the attributes in one lookup, and buckets maps
// the packed key -> the set of ids at that key, so a query reads exactly
// its bucket. The key packs the type bit above 30 price bits (price <= 10^9
// < 2^30). Queries return sorted ids — the statement frees the order.
type OrderManagementSystem struct {
	orders  map[int]uint64
	buckets map[uint64]map[int]struct{}
}

func NewOrderManagementSystemTyped() *OrderManagementSystem {
	return &OrderManagementSystem{
		orders:  make(map[int]uint64),
		buckets: make(map[uint64]map[int]struct{}),
	}
}

func (design *OrderManagementSystem) addOrder(orderId int, orderType string, price int) {
	key := orderKey(orderType, price)
	design.orders[orderId] = key
	design.bucket(key)[orderId] = struct{}{}
}

func (design *OrderManagementSystem) modifyOrder(orderId int, newPrice int) {
	oldKey := design.orders[orderId]
	delete(design.buckets[oldKey], orderId)
	newKey := (oldKey & orderTypeBit) | uint64(newPrice)
	design.orders[orderId] = newKey
	design.bucket(newKey)[orderId] = struct{}{}
}

func (design *OrderManagementSystem) cancelOrder(orderId int) {
	delete(design.buckets[design.orders[orderId]], orderId)
	delete(design.orders, orderId)
}

func (design *OrderManagementSystem) getOrdersAtPrice(orderType string, price int) []int {
	bucket := design.buckets[orderKey(orderType, price)]
	ids := make([]int, 0, len(bucket))
	for id := range bucket {
		ids = append(ids, id)
	}
	sort.Ints(ids)
	return ids
}

func (design *OrderManagementSystem) bucket(key uint64) map[int]struct{} {
	b := design.buckets[key]
	if b == nil {
		b = make(map[int]struct{})
		design.buckets[key] = b
	}
	return b
}

const orderTypeBit = uint64(1) << 30

func orderKey(orderType string, price int) uint64 {
	key := uint64(price)
	if orderType == "sell" {
		key |= orderTypeBit
	}
	return key
}
