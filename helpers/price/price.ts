import { colors, Price } from "../../deps.ts";

/*
interface iCentPrecision {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

interface iPrice {
  id: string;
  value: iCentPrecision;
  key: string;
  country: string;
  discounted: {
    value: iCentPrecision;
    discount: {
      typeId: string;
      id: string;
    };
  };
}
*/
export function formatPrice(price: Price | undefined): string {
  if (price === undefined) return "";
  const code = price.value.currencyCode;
  const value = (price.value.centAmount / (10 ** price.value.fractionDigits))
    .toFixed(2);

  if (price!.discounted !== undefined) {
    const discount = (price!.discounted.value.centAmount /
      (10 ** price!.discounted.value.fractionDigits)).toFixed(2);
    const dcode = price!.discounted.value.currencyCode;
    if (discount) {
      return `${colors.strikethrough(value + " " + code)} ${
        colors.red.bold(discount + " " + dcode)
      }`;
    }
  }
  return ` ${colors.red.bold(value + " " + code)}`;
}
