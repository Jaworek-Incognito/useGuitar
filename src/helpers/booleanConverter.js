export function booleanConverter(value) {
  if (value === true || value === "true") return "Yes";
  if (value === false || value === "false") return "No";
  if (!value) return "No pickup";
  else return value;
}
