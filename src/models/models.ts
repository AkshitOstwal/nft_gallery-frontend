export interface UserDataDto {
    address: String;
    joinedAt: Date;
    updatedAt: Date;
    tokensCount: number;
    tokens: Token[];
}


export interface Token {
    id: string;
    tokenId: string;
    contractAddress: string;
    name: null | string;
    chainId: number;
    collectionName: string;
    image: null | string;
    imageSmall: null | string;
    floorPriceUSD: string;
    floorPriceWEI: string;
    itemCount: number;
    totalCostBasisUSD: string;
    totalCostBasisWEI: string;
    totalCurrentValueUSD: string;
    totalCurrentValueWEI: string;
    unrealizedGainsLosses: number;
    dateOfAcquisition: Date;
    rarityRank: number | null;
    userDataAddress: String;
}