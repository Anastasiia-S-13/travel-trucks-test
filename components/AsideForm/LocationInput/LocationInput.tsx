import { CampersFilterItemProps } from "@/types/Camper";
import css from "./LocationInput.module.css";

export default function LocationInput({ filters, setFilters }: CampersFilterItemProps) {
  return (
    <div>
      <label className={css.label} htmlFor="location">
        Location
      </label>
      <div>
              <input
                  className={css.locationInput}
          id="location"
          name="location"
          type="text"
          value={filters.location || ""}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value.trim() })
          }
          placeholder="City"
        />
      </div>
    </div>
  );
};
