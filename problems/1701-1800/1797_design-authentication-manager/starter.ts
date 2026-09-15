class AuthenticationManager {
    constructor(timeToLive: number) {}

    generate(tokenId: string, currentTime: number) {}

    renew(tokenId: string, currentTime: number) {}

    countUnexpiredTokens(currentTime: number): number {}
}
