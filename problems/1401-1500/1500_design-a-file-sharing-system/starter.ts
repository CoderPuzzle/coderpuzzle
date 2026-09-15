class FileSharing {
    constructor(m: number) {}

    join(ownedChunks: number[]): number {}

    leave(userID: number) {}

    request(userID: number, chunkID: number): number[] {}
}
