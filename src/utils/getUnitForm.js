export const getUnitForm = (unit) => {
  switch (unit){
    case "pcs":
      return "Dona";
    case "l":
      return "L";
    case "kg":
      return "KG";
    default:
      return "miqdor";
  }
}