export const shortenAddress = (address: string, length: number = 4): string => {
    return `${address.slice(0, length)}...${address.slice(-length)}`;
};