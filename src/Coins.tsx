import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoinFetcher } from "./Fetcher";

export const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 20px;
  font-size: 50px;
  text-align: center;
`;

export const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  color: ${(props) => props.theme.fontColor};
  padding: 10px;
`;

export const Header = styled.div``;

const CoinList = styled.ul`
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CoinItem = styled.li`
  background-color: ${(props) => props.theme.fontColor};
  color: ${(props) => props.theme.bgColor};
  width: 300px;
  margin-bottom: 10px;
  padding: 10px 20px;
  border-radius: 20px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>(
    "allCoins",
    CoinFetcher
  );

  /*
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  useEffect(() => {
    try {
      (async () => {
        const Data = await (
          await fetch(`https://api.coinpaprika.com/v1/coins`)
        ).json();
        console.log(Data.slice(0, 100));
        setCoins(Data.slice(0, 100));
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  */
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinList>
        {isLoading
          ? isLoading
          : data?.slice(0, 100).map((coin) => {
              return (
                <CoinItem key={coin.id}>
                  <Link
                    to={{
                      pathname: `/${coin.id}`,
                      state: { name: coin.name },
                    }}
                  >
                    {coin.name}
                  </Link>
                </CoinItem>
              );
            })}
      </CoinList>
    </Container>
  );
}

export default Coins;
