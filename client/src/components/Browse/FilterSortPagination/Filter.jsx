import { Slider, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterList from './FilterList'
import { filterMap } from './FilterListMap'

const Filter = () => {
    const sliderMin = 0, sliderMax = 100000 
    const [searchParams, setSearchParams] = useSearchParams({})

    const sliderMinBefore = searchParams.get(decodeURI("salary%5Bgte%5D"))
    const sliderMaxBefore = searchParams.get(decodeURI("salary%5Blte%5D"))

    const sliderMinCurr = parseInt( sliderMinBefore ? sliderMinBefore : sliderMin)
    const sliderMaxCurr = parseInt(sliderMaxBefore ? sliderMaxBefore : sliderMax)

    const [salaryRange, setSalaryRange] = useState([sliderMinCurr, sliderMaxCurr])    

    const handlePriceInputChange = (e, type) => {
        let newRange;
    
        if (type === "lower") {
            newRange = [...salaryRange];
            newRange[0] = Number(e.target.value);
        
            if(newRange[0] === sliderMin) {
                setSalaryRange(newRange);
                searchParams.delete('salary[gte]')
                setSearchParams(searchParams, {replace: true})
            } else {
                setSalaryRange(newRange);
                searchParams.set('salary[gte]', newRange[0])
                setSearchParams(searchParams, {replace: true})
            }
        }
    
        if (type === "upper") {
            newRange = [...salaryRange];
            newRange[1] = Number(e.target.value);
        
            if(newRange[1] === sliderMax) {
                setSalaryRange(newRange);
                searchParams.delete('salary[lte]')
                setSearchParams(searchParams, {replace: true})
            } else {
                setSalaryRange(newRange);
                searchParams.set('salary[lte]', newRange[1])
                setSearchParams(searchParams, {replace: true})
            }
            
        }
    };

    
      
  return (
    
    <div>
        <div className="accordion accordion-flush my-3" id="accordionExample">
            {filterMap.map((filter, idx) => {
                return (
                    <FilterList filter={filter} idx={idx} key={idx}/>
                )
            })}

            <div className="accordion-item">
                <h2 className="accordion-header" id="salaryRange">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSalaryRange" aria-expanded="true" aria-controls="#collapseSalaryRange">
                    Salary Range
                </button>
                </h2>
                <div id="collapseSalaryRange" className="accordion-collapse collapse show" aria-labelledby="salaryRange">
                    <div className="accordion-body">
                    <Slider
                        min={sliderMin}
                        max={sliderMax}
                        value={salaryRange}
                        valueLabelDisplay="auto"
                        onChange={e => setSalaryRange(e.target.value)}
                        
                    />
                    <div className="hourly-form">
                        <TextField className="mb-2" size="small" id="lower" label="Min Price" variant="outlined" type="number" 
                        value={salaryRange[0]}
                        onChange={e => handlePriceInputChange(e, "lower")}/>

                        <TextField size="small" id="upper" label="Max Price" variant="outlined" type="number" 
                        value={salaryRange[1]}
                        onChange={e => handlePriceInputChange(e, "upper")}/>
                    </div>
                    
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
  ) 
}

export default Filter