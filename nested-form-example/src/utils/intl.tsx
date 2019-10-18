export function numberFormat(value: number) {
  let formatter = new Intl.NumberFormat([], {
    style: "currency",
    currency: "BRL"
  });

  if (!value) value = 0;
  return formatter.format(value);
}
