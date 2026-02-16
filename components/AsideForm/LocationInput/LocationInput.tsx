import { CampersFilterItemProps } from "@/types/Camper";

export default function LocationInput({ filters, setFilters }: CampersFilterItemProps) {
  return (
    <div>
      <label htmlFor="location">
        Location
      </label>
      <div>
        <input
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
