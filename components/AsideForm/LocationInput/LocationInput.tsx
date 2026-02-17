import { CampersFilterItemProps } from "@/types/Camper";
import css from "./LocationInput.module.css";

export default function LocationInput({ filters, setFilters }: CampersFilterItemProps) {
  return (
    <div className={css.locationWrapper}>
      <label className={css.label} htmlFor="location">
        Location
      </label>
      <div className={css.inputWrapper}>
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
              <svg width={20} height={20} className={css.icon}>
                  <use href="/sprite/sprite.svg#icon-map" />
              </svg>
      </div>
    </div>
  );
};
