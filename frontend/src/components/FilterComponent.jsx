import React, { useState } from "react";

const FilterComponent = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filters = [
    { id: "release-date", label: "Release Date" },
    { id: "a-z", label: "A-Z" },
    { id: "rating", label: "Rating" },
    { id: "length", label: "Length" },
  ];

  const handleFilterClick = (filterId) => {
    setSelectedFilter(filterId);
    onFilterChange(filterId);
  };

  const buttonStyle = (filterId) => ({
    backgroundColor: selectedFilter === filterId ? "#FFC107" : "transparent",
    borderColor: selectedFilter === filterId ? "#FFC107" : "#000",
    border: `1px solid ${selectedFilter === filterId ? "#FFC107" : "#000"}`,
    color: selectedFilter === filterId ? "#000" : "#000",
    transition: "all 0.3s ease",
  });

  return (
    <div className="mb-4">
      <div className="d-flex gap-2 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className="btn"
            style={buttonStyle(filter.id)}
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
