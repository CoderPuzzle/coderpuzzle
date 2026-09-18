class MinHeap {
    constructor(before) {
        this.items = [];
        this.before = before; // strict "a strictly before b" comparator
    }

    get size() {
        return this.items.length;
    }

    push(item) {
        const items = this.items;
        items.push(item);
        for (let child = items.length - 1; child > 0;) {
            const parent = (child - 1) >> 1;
            if (!this.before(items[child], items[parent])) {
                break;
            }
            [items[parent], items[child]] = [items[child], items[parent]];
            child = parent;
        }
    }

    pop() {
        const items = this.items;
        const top = items[0];
        const last = items.pop();
        if (items.length > 0) {
            items[0] = last;
            for (let parent = 0; ;) {
                const left = parent * 2 + 1;
                const right = left + 1;
                let first = parent;
                if (left < items.length && this.before(items[left], items[first])) {
                    first = left;
                }
                if (right < items.length && this.before(items[right], items[first])) {
                    first = right;
                }
                if (first === parent) {
                    break;
                }
                [items[parent], items[first]] = [items[first], items[parent]];
                parent = first;
            }
        }
        return top;
    }
}

class MovieRentingSystem {
    constructor(n, entries) {
        this.price = new Map(); // (shop, movie) -> price
        this.unrented = new Map(); // movie -> heap of [price, shop, token]
        this.unrentedToken = new Map(); // copy -> live shelf token
        this.rented = new MinHeap((a, b) => (a[0] !== b[0] ? a[0] < b[0] : a[1] !== b[1] ? a[1] < b[1] : a[2] < b[2]));
        this.rentedToken = new Map(); // copy -> live rented token
        this.serial = 0;
        for (const [shop, movie, price] of entries) {
            const copy = this.pack(shop, movie);
            this.price.set(copy, price);
            this.serial++;
            this.unrentedToken.set(copy, this.serial);
            let shelf = this.unrented.get(movie);
            if (!shelf) {
                shelf = new MinHeap((a, b) => (a[0] !== b[0] ? a[0] < b[0] : a[1] < b[1]));
                this.unrented.set(movie, shelf);
            }
            shelf.push([price, shop, this.serial]);
        }
    }

    pack(shop, movie) {
        return shop * 100001 + movie;
    }

    search(movie) {
        const result = [];
        const shelf = this.unrented.get(movie);
        if (!shelf) {
            return result;
        }
        const kept = [];
        while (shelf.size > 0 && result.length < 5) {
            const entry = shelf.pop();
            if (this.unrentedToken.get(this.pack(entry[1], movie)) !== entry[2]) {
                continue; // stale entry from a rent/handBack cycle
            }
            result.push(entry[1]);
            kept.push(entry);
        }
        for (const entry of kept) {
            shelf.push(entry);
        }
        return result;
    }

    rent(shop, movie) {
        this.unrentedToken.delete(this.pack(shop, movie));
        this.serial++;
        const copy = this.pack(shop, movie);
        this.rentedToken.set(copy, this.serial);
        this.rented.push([this.price.get(copy), shop, movie, this.serial]);
    }

    drop(shop, movie) {
        const copy = this.pack(shop, movie);
        this.rentedToken.delete(copy);
        this.serial++;
        this.unrentedToken.set(copy, this.serial);
        let shelf = this.unrented.get(movie);
        if (!shelf) {
            shelf = new MinHeap((a, b) => (a[0] !== b[0] ? a[0] < b[0] : a[1] < b[1]));
            this.unrented.set(movie, shelf);
        }
        shelf.push([this.price.get(copy), shop, this.serial]);
    }

    report() {
        const result = [];
        const kept = [];
        while (this.rented.size > 0 && result.length < 5) {
            const entry = this.rented.pop();
            if (this.rentedToken.get(this.pack(entry[1], entry[2])) !== entry[3]) {
                continue;
            }
            result.push([entry[1], entry[2]]);
            kept.push(entry);
        }
        for (const entry of kept) {
            this.rented.push(entry);
        }
        return result;
    }
}
