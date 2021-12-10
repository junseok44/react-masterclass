import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { CoinOHLC } from "../Fetcher";

export function Chart({ CoinId }: { CoinId: string }) {
  const { isLoading, data: OHLC_DATA } = useQuery<
    {
      close: number;
      high: number;
      low: number;
      open: number;
      market_cap: number;
      time_close: string;
      time_open: string;
      volume: number;
    }[]
  >(["COIN_OHLC_CHART", CoinId], () => CoinOHLC(CoinId));

  const data123 = OHLC_DATA?.map((data) => {
    return {
      x: data.time_close.substr(0, 10),
      y: [
        data.open.toFixed(3),
        data.high.toFixed(3),
        data.low.toFixed(3),
        data.close.toFixed(3),
      ],
    };
  });

  return (
    <div>
      {isLoading ? (
        "loading"
      ) : (
        <ApexChart
          series={[
            {
              data: data123,
            },
          ]}
          type="candlestick"
          height="350"
          options={{
            title: {
              text: `${CoinId} chart`,
            },

            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            tooltip: {
              enabled: true,
              enabledOnSeries: undefined,
              shared: true,
              followCursor: false,
              intersect: false,
              inverseOrder: false,
              custom: undefined,
              fillSeriesColor: true,
              theme: "light",
              style: {
                fontSize: "12px",
              },
              onDatasetHover: {
                highlightDataSeries: false,
              },
              marker: {
                show: true,
              },
              items: {
                display: "flex",
              },
              y: [
                {
                  formatter: function (y) {
                    if (typeof y !== "undefined") {
                      return y + "hey";
                    }
                    return y;
                  },
                },
              ],

              fixed: {
                enabled: false,
                position: "topRight",
                offsetX: 0,
                offsetY: 0,
              },
            },
            grid: {
              show: false,
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}
