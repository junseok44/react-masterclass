import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { CoinOHLC } from "../Fetcher";

export function Price({ CoinId }: { CoinId: string }) {
  const { isLoading, data: OHLC_DATA } = useQuery<
    {
      close: number;
      high: number;
      low: number;
      market_cap: number;
      open: number;
      time_close: string;
      time_open: string;
      volume: number;
    }[]
  >(["COIN_OHLC", CoinId], () => CoinOHLC(CoinId));

  return (
    <>
      {isLoading ? (
        "Loading.."
      ) : (
        <>
          <ApexChart
            width="100%"
            series={[
              {
                name: "close",
                data: OHLC_DATA?.map((day) => Math.floor(day.close)),
              },
              {
                name: "open",
                data: OHLC_DATA?.map((day) => Math.floor(day.open)),
              },
            ]}
            type="area"
            options={{
              grid: {
                show: false,
              },
              chart: {
                stacked: false,
                height: 350,
                zoom: {
                  type: "x",
                  enabled: true,
                  autoScaleYaxis: true,
                },
                toolbar: {
                  autoSelected: "zoom",
                },
              },
              dataLabels: {
                enabled: false,
              },
              markers: {
                size: 0,
              },
              title: {
                text: `${CoinId} last 7 days`,
                align: "left",
              },
              fill: {
                type: "gradient",
                gradient: {
                  shadeIntensity: 1,
                  inverseColors: false,
                  opacityFrom: 0.5,
                  opacityTo: 0,
                  stops: [0, 90, 100],
                },
              },

              xaxis: {
                categories: OHLC_DATA?.map((day) =>
                  day.time_close.substr(0, 10)
                ),
              },
              tooltip: {
                shared: true,
                y: {
                  formatter: function (val) {
                    return (val / 1000000).toFixed(0);
                  },
                },
              },
            }}
          ></ApexChart>
        </>
      )}
    </>
  );
}
