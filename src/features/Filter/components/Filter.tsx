import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FILTERS, type FilterType } from "../../../types/filter";
import { selectFilter, setFilter } from "../filter-slice";
import "./Filter.scss";

export const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);

  return (
    <div className="filter">
      <label htmlFor="filter">Filter by Status:</label>
      <select
        id="filter"
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value as FilterType))}
      >
        {FILTERS.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>
  );
};
