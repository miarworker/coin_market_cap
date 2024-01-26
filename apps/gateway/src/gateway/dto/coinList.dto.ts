export class CoinData {
  id: number;
  name: string;
  symbol: string;
  price: string;
  change1H: string;
  change24H: string;
  change7d: string;
  marketCap: string;
  volume24H: string;
  supply: string;
  chart: { time: Date; price: string }[];
}
