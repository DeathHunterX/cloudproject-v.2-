import React from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterList = ({filter, idx}) => {
    const [searchParams, setSearchParams] = useSearchParams({})

    const handleFilteredInput = (e) => {
        const {name, value} = e.target
        if (value.length === 0) {
            searchParams.delete(`${name}`)
            setSearchParams(searchParams, {replace: true})
        } else {
            searchParams.set(`${name}`, value)
            setSearchParams(searchParams, {replace: true})
        }
    }

    return (
        <div className="accordion-item" key={idx}>
            <h2 className="accordion-header" id={`${filter.id}`}>
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`} aria-expanded="true" aria-controls={`#collapse${idx}`}>
                {filter.header}
            </button>
            </h2>
            <div id={`collapse${idx}`} className="accordion-collapse collapse show" aria-labelledby={`${filter.id}`}>
                <div className="accordion-body">
                    <div className="form-group">
                        <select className="form-select" id={`${filter.id}`} name={`${filter.id}`} value={searchParams.get(`${filter.id}`)} onChange={handleFilteredInput}>
                            {
                                filter.selection.map((selection, idx2) => {
                                    return (
                                        <option value={`${selection.id}`}>{selection.name}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterList

