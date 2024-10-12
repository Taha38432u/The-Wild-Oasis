import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";

function CabinTableOperations() {
  const options = [
    { value: "all", label: "All" },
    { value: "with-discount", label: "With discount" },
    { value: "without-discount", label: "Without discount" },
  ];
  return (
    <TableOperations>
      <Filter filterField="discount" options={options} />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A" },
          { value: "regularPrice-asc", label: "Sort by price (Low First)" },
          { value: "regularPrice-desc", label: "Sort by price (High First)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (Low First)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (High First)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
