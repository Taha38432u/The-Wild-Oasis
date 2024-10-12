import Select from "./Select.jsx";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams({});

  function handleChange(event) {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  }

  return <Select options={options} onChange={handleChange} />;
}

export default SortBy;
