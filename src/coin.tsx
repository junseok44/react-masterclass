import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { Container, Header, Title } from "./Coins";
import { Chart } from "./route/Chart";
import { Price } from "./route/Price";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { CoinInfo, CoinPrice } from "./Fetcher";
import styled from "styled-components";
import { useState } from "react";
import { Helmet } from "react-helmet";

interface Paramtype {
  CoinId: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const GridContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-template-rows: repeat(auto-fill, minmax(100px, auto));
  justify-content: center;
  margin-bottom: 20px;
  grid-gap: 10px;
`;

const ColoredItem = styled.div`
  background-color: ${(props) => props.color};
  padding: 10px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  color: white;
  font-family: "Raleway", sans-serif;
`;

function Coin() {
  const { CoinId } = useParams<Paramtype>();
  // 얘네 둘이 typesciprt 쓰는 형식이 조금 헷갈리는데...시간날때 다시 시험.
  // 하나 거슬리는것은 여기. 지금은 params을 가져다 썼는데, 왜냐하면 state를 쓰니까
  // switch되는 컴포넌트에서 state를 못읽어왓기 때문. 수업에서는 어떻게 했는지?

  const isChart = useRouteMatch({ path: `/${CoinId}/Chart` });
  const isPrice = useRouteMatch({ path: `/${CoinId}/Price` });

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["CoinInfo", CoinId],
    () => CoinInfo(CoinId)
  );

  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["PriceInfo", CoinId],
    () => CoinPrice(CoinId),
    {
      refetchInterval: 3000,
    }
  );

  const AllLoading = infoLoading || priceLoading;

  const [isDark, setDark] = useState(false);

  return (
    <Container>
      <Helmet>
        <title>{CoinId}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <Header>
        <Title> {CoinId}</Title>
      </Header>

      {AllLoading ? (
        "loading..."
      ) : (
        <>
          <GridContainer>
            <ColoredItem color={"#1abc9c"}>
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                }}
              >
                name
              </div>
              <div>{infoData?.name}</div>
            </ColoredItem>
            <ColoredItem color={"#9b59b6"}>
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                }}
              >
                icons
              </div>
              <img
                src={`https://api.coinicons.net/icon/${infoData?.symbol}/64x64
                `}
                alt="coin"
              ></img>
            </ColoredItem>
            <ColoredItem color={"#2980b9"}>
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                }}
              >
                quotes
              </div>
              <div>{priceData?.quotes.USD.price}</div>
            </ColoredItem>

            <ColoredItemAll
              color={"#d35400"}
              upLine="description"
              bottomLine={infoData?.description}
              style={{
                gridColumnStart: 1,
                gridColumnEnd: 4,
                fontSize: "0.9rem",
              }}
            ></ColoredItemAll>

            <ColoredItem
              onClick={() => setDark(!isDark)}
              color={isDark ? "#34495e" : "#ecf0f1"}
              style={{ color: isDark ? "white" : "black" }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                }}
              >
                mode
              </div>
              <div>{isDark ? "dark mode" : "light mode"}</div>
            </ColoredItem>

            <ColoredItemAll
              color={"#95a5a6"}
              style={{ gridColumnStart: 2, gridColumnEnd: 4 }}
              upLine="development status"
              bottomLine={infoData?.development_status}
            ></ColoredItemAll>

            <Link to={`/`}>
              <ColoredItemAll color={"#3498db"} upLine="Home"></ColoredItemAll>
            </Link>
            <Link to={`/${CoinId}/Chart`}>
              <ColoredItemAll
                color={"#1abc9c"}
                upLine="show Chart"
                style={{
                  color: isChart !== null ? "red" : "white",
                }}
              ></ColoredItemAll>
            </Link>
            <Link to={`/${CoinId}/Price`}>
              <ColoredItemAll
                color={"#8e44ad"}
                upLine="show Price"
                style={{
                  color: isPrice !== null ? "red" : "white",
                }}
              ></ColoredItemAll>
            </Link>
          </GridContainer>

          <Switch>
            <Route path={`/${CoinId}/Chart`}>
              <Chart CoinId={CoinId}></Chart>
            </Route>
            <Route path={`/${CoinId}/Price`}>
              <Price CoinId={CoinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

function ColoredItemAll({
  color,
  upLine,
  bottomLine,
  style,
  onClick,
}: {
  color: string;
  upLine?: string;
  bottomLine?: string | undefined;
  style?: object;
  onClick?: Function;
  children?: undefined;
}) {
  return (
    <ColoredItem color={color} style={style} onClick={() => onClick}>
      <div
        style={{ marginBottom: "10px", fontSize: "0.8rem", fontWeight: "700" }}
      >
        {upLine}
      </div>
      <div style={{ textAlign: "right" }}>{bottomLine}</div>
    </ColoredItem>
  );
}

export default Coin;
