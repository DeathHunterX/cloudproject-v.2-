import React, {useEffect, useState} from 'react'

import {FiSearch} from "react-icons/fi"
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        
    })
    const searchCurr = searchParams.get('search')
    const [searchData, setSearchData] = useState(searchCurr ? searchCurr : "")

    const navigate = useNavigate()
    const {pathname} = useLocation()
    
    const handleSearch = (e) => {
        e.preventDefault();
        const search = searchData

        if(search.length === 0) {
            searchParams.delete('search')
            setSearchParams(searchParams, {replace: true})     
        } else {
            searchParams.set('search', search)
            setSearchParams(searchParams, {replace: true})
        }

        if (pathname !== '/browse') {
            navigate({
                pathname: "/browse",
                search: `?search=${search}`
            })
        }        
    }

    useEffect(() => {
        if(pathname === "/"){
            setSearchData("")
        }
    }, [pathname])

    return (
        <form className="search" onSubmit={handleSearch}>
            <input className="search_input" type="text" name="search" placeholder="Search here..." id="search"
            value={searchData}
            defaultChecked={searchParams.get('search')}
            onChange={(e) => {setSearchData(e.target.value)}}
            onKeyPress={(e) => (e.key === "Enter" && handleSearch(e))}
            />
            <button className="search_icon"><FiSearch /></button>
        </form>
    )
}

export default Search