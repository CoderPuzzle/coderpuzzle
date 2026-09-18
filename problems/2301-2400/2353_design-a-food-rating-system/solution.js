class EntryHeap {
    constructor() {
        this.items = [];
    }

    get size() {
        return this.items.length;
    }

    peek() {
        return this.items[0];
    }

    push(item) {
        const items = this.items;
        items.push(item);
        let child = items.length - 1;
        while (child > 0) {
            const parent = (child - 1) >> 1;
            if (!entryLess(items[child], items[parent])) {
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
            let parent = 0;
            for (;;) {
                let smallest = parent;
                const left = 2 * parent + 1;
                const right = left + 1;
                if (left < items.length && entryLess(items[left], items[smallest])) {
                    smallest = left;
                }
                if (right < items.length && entryLess(items[right], items[smallest])) {
                    smallest = right;
                }
                if (smallest === parent) {
                    break;
                }
                [items[parent], items[smallest]] = [items[smallest], items[parent]];
                parent = smallest;
            }
        }
        return top;
    }
}

// Orders [negRating, player] pairs: smaller negRating first, ties to the
// smaller player name — so the heap's minimum is the required winner.
function entryLess(a, b) {
    if (a[0] !== b[0]) {
        return a[0] < b[0];
    }
    return a[1] < b[1];
}

class FoodRatings {
    constructor(players, teams, scores) {
        this.info = new Map();
        this.byTeam = new Map();
        for (let index = 0; index < players.length; index++) {
            const player = players[index];
            const team = teams[index];
            const rating = scores[index];
            this.info.set(player, [team, rating]);
            let heap = this.byTeam.get(team);
            if (heap === undefined) {
                heap = new EntryHeap();
                this.byTeam.set(team, heap);
            }
            // The min of (-rating, name) is exactly the required winner:
            // highest rating first, ties to the smaller name.
            heap.push([-rating, player]);
        }
    }

    changeRating(player, score) {
        // Lazy deletion: push a fresh entry and leave the outdated one in the
        // heap as garbage; only the info map holds the current rating.
        const record = this.info.get(player);
        record[1] = score;
        this.byTeam.get(record[0]).push([-score, player]);
    }

    highestRated(team) {
        const heap = this.byTeam.get(team);
        while (heap.size > 0) {
            const [negRating, player] = heap.peek();
            // An entry is stale when its rating disagrees with the player's
            // current rating; a valid top is peeked, never consumed.
            if (this.info.get(player)[1] === -negRating) {
                return player;
            }
            heap.pop();
        }
        return "";
    }
}
