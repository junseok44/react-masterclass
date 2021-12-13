import "styled-components";
// 이건 왜 필요한거지?
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    fontColor: string;
  }
}
