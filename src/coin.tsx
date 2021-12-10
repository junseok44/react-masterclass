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

const ColoredItem = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");
  background-color: ${(props) => props.color};
  padding: 10px;
  font-size: 20px;
  display: flex;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  font-family: "Open Sans", sans-serif;
`;

function Coin() {
  const { CoinId } = useParams<Paramtype>();
  // 얘네 둘이 typesciprt 쓰는 형식이 조금 헷갈리는데...시간날때 다시 시험.
  const { state } = useLocation<{ name: string }>();
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
    () => CoinPrice(CoinId)
  );

  const AllLoading = infoLoading || priceLoading;

  const [isDark, setDark] = useState(false);

  return (
    <Container>
      <Header>
        <Title> {CoinId}</Title>
      </Header>
      {AllLoading ? (
        "loading..."
      ) : (
        <>
          <div
            style={{
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(3,30%)",
              gridTemplateRows: "repeat(auto-fill,minmax(100px, auto))",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <ColoredItem color={"#1abc9c"}>{infoData?.name}</ColoredItem>
            <ColoredItem color={"#9b59b6"}>{infoData?.type}</ColoredItem>
            <ColoredItem color={"#2980b9"}>rank : {infoData?.rank}</ColoredItem>
            <ColoredItem
              color={"#d35400"}
              style={{
                gridColumnStart: 1,
                gridColumnEnd: 4,
                fontSize: "0.9rem",
              }}
            >
              {infoData?.description}
            </ColoredItem>
            <ColoredItem
              color={isDark ? "#ecf0f1" : "#34495e"}
              onClick={() => setDark(!isDark)}
            >
              {isDark ? "light mode" : "dark mode"}
            </ColoredItem>
            <ColoredItem
              color={"#95a5a6"}
              style={{ gridColumnStart: 2, gridColumnEnd: 4 }}
            >
              development_status: {infoData?.development_status}
            </ColoredItem>
            <Link to={`/`}>
              <ColoredItem color={"#3498db"} style={{ marginTop: "10px" }}>
                Home
              </ColoredItem>
            </Link>
            <Link to={`/${CoinId}/Chart`}>
              <ColoredItem color={"#1abc9c"} style={{ marginTop: "10px" }}>
                show Chart
              </ColoredItem>
            </Link>
            <Link to={`/${CoinId}/Price`}>
              <ColoredItem color={"#8e44ad"} style={{ marginTop: "10px" }}>
                show Price
              </ColoredItem>
            </Link>
          </div>

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

export default Coin;
