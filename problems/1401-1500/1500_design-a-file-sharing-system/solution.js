class FileSharing {
    constructor(m) {
        this.chunks = new Map();
        this.alive = new Set();
        this.freed = [];
        this.nextId = 1;
    }

    join(ownedChunks) {
        let uid;
        if (this.freed.length > 0) {
            uid = Math.min(...this.freed);
            this.freed.splice(this.freed.indexOf(uid), 1);
        } else {
            uid = this.nextId++;
        }
        this.chunks.set(uid, new Set(ownedChunks));
        this.alive.add(uid);
        return uid;
    }

    leave(userID) {
        this.chunks.delete(userID);
        this.alive.delete(userID);
        this.freed.push(userID);
    }

    request(userID, chunkID) {
        const owners = [...this.alive].filter((uid) => this.chunks.get(uid).has(chunkID)).sort((a, b) => a - b);
        if (owners.length > 0) {
            this.chunks.get(userID).add(chunkID);
        }
        return owners;
    }
}
