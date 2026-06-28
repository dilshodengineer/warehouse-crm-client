export const getUnitForm = (unit) => {
  switch (unit){
    case "pcs":
      return "dona";
    case "l":
      return "L";
    case "kg":
      return "kg";
    default:
      return "miqdor";
  }
}