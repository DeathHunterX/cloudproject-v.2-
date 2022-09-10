import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Sorting = () => {
    const [searchParams, setSearchParams] = useSearchParams({})
    const setSort = searchParams.get('sort') || ""

    const handleSort = (e) => {
        const {value} = e.target
        if (value.length === 0) {
            searchParams.delete('sort')
            setSearchParams(searchParams, {replace: true})
        } else {
            searchParams.set('sort', value)
            setSearchParams(searchParams, {replace: true})
        }
      }
    return (
        <div className="sorting d-flex ms-4" >
            <div className="sorting_header d-flex align-items-center" style={{width: "120px"}}><h5>Sort By: </h5></div>
            <select className="form-select" value={setSort} onChange={handleSort}>
                <option value="">Default</option>
                <option value="title">Sort A to Z</option>
                <option value="-title">Sort Z to A</option>
                <option value="salary">Salary: Low-High</option>
                <option value="-salary">Salary: High-Low</option>
            </select>
        </div>
  )
}

export default Sorting