import React from 'react'

export const SearchPage = () => {
  return (
    // Basic search bar with no implementation of the database yet
    <div className="d-flex justify-content-center mt-5">
        <div className="w-50">
            <input
                type="text"
                className="form-control"
                placeholder="Search For A Movie"
                id="inputDefault"
            />
        </div>
    </div>
  )
}