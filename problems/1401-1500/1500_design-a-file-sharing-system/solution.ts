class FileSharing {
    private chunks: Map<number, Set<number>>;
    private alive: Set<number>;
    private freed: number[];
    private nextId: number;

    constructor(m: number) {
        this.chunks = new Map();
        this.alive = new Set();
        this.freed = [];
        this.nextId = 1;
    }

    join(ownedChunks: number[]): number {
        let uid: number;
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

    leave(userID: number) {
        this.chunks.delete(userID);
        this.alive.delete(userID);
        this.freed.push(userID);
    }

    request(userID: number, chunkID: number): number[] {
        const owners = [...this.alive].filter((uid) => this.chunks.get(uid)!.has(chunkID)).sort((a, b) => a - b);
        if (owners.length > 0) {
            this.chunks.get(userID)!.add(chunkID);
        }
        return owners;
    }
}
