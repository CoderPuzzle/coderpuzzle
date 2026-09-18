class MinHeap<T> {
    private items: T[] = [];
    constructor(private before: (a: T, b: T) => boolean) {} // strict "a before b"

    get size(): number {
        return this.items.length;
    }

    push(item: T): void {
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

    pop(): T {
        const items = this.items;
        const top = items[0];
        const last = items.pop() as T;
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

// One unrented copy on a movie's shelf.
type ShelfEntry = [number, number, number]; // [price, shop, token]
// One rented copy, competing globally by price then shop then movie.
type RentedEntry = [number, number, number, number]; // [price, shop, movie, token]

class MovieRentingSystem {
    private price = new Map<number, number>(); // copy -> price
    private unrented = new Map<number, MinHeap<ShelfEntry>>(); // movie -> shelf
    private unrentedToken = new Map<number, number>(); // copy -> live shelf token
    private rented: MinHeap<RentedEntry> = new MinHeap((a, b) =>
        a[0] !== b[0] ? a[0] < b[0] : a[1] !== b[1] ? a[1] < b[1] : a[2] < b[2],
    );
    private rentedToken = new Map<number, number>(); // copy -> live rented token
    private serial = 0;

    constructor(n: number, entries: number[][]) {
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

    private pack(shop: number, movie: number): number {
        return shop * 100001 + movie;
    }

    search(movie: number): number[] {
        const result: number[] = [];
        const shelf = this.unrented.get(movie);
        if (!shelf) {
            return result;
        }
        const kept: ShelfEntry[] = [];
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

    rent(shop: number, movie: number): void {
        this.unrentedToken.delete(this.pack(shop, movie));
        this.serial++;
        const copy = this.pack(shop, movie);
        this.rentedToken.set(copy, this.serial);
        this.rented.push([this.price.get(copy) as number, shop, movie, this.serial]);
    }

    drop(shop: number, movie: number): void {
        const copy = this.pack(shop, movie);
        this.rentedToken.delete(copy);
        this.serial++;
        this.unrentedToken.set(copy, this.serial);
        let shelf = this.unrented.get(movie);
        if (!shelf) {
            shelf = new MinHeap((a, b) => (a[0] !== b[0] ? a[0] < b[0] : a[1] < b[1]));
            this.unrented.set(movie, shelf);
        }
        shelf.push([this.price.get(copy) as number, shop, this.serial]);
    }

    report(): number[][] {
        const result: number[][] = [];
        const kept: RentedEntry[] = [];
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
