import React, { useState, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getAllPosts } from '../../redux/actions/postAction'

import Result from './Result'

import Sorting from './FilterSortPagination/Sorting'
import Pagination from './FilterSortPagination/Pagination'
import Filter from './FilterSortPagination/Filter'

import {FaFilter} from 'react-icons/fa'



const Browse = () => {

  // const searchBottom = [
  //   {label: 'Employees', path: '/browseUser'},
  //   {label: 'Jobs', path: '/browseJobs'}
  // ]

  const [searchParams, setSearchParams] = useSearchParams({})

  const limitCurr = parseInt(searchParams.get('limit') ? searchParams.get('limit') : 5)
  const [limit, setLimit] = useState(limitCurr)

  const {search} = useLocation()
  
  const [posts, setPosts] = useState([])
  
  const [onFilter, setOnFilter] = useState(false)
 
  const { homePosts }  = useSelector(state => state)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllPosts(decodeURI(search)))
  }, [dispatch, search])

  useEffect(() => {
    if(homePosts?.posts) setPosts(homePosts.posts)
  }, [homePosts.posts])
  
  let totalPages = 1

  if(homePosts?.total > 1) {
    totalPages = Math.ceil(homePosts?.total / limit)
  }

  const handleLimitChange = (e) => {
    const {value} = e.target
    if (value === "5") {
      setLimit(value)
      searchParams.delete('limit')
      setSearchParams(searchParams, {replace: true})
    } else {
      setLimit(value)
      searchParams.set('limit', value)
      setSearchParams(searchParams, {replace: true})
    }
  }

  
  
  return (
    <div className="container pt-4">
      <h1>Browse</h1>
      <div className="d-flex justify-content-between" >
        <div className="d-flex">
            <button className="btn btn-outline-secondary"
            onClick={() => setOnFilter(prev => !prev )}>
            <FaFilter/> Filter
            </button>
            <div className="limit d-flex" style={{marginLeft: "10vw"}} >
                <span className="d-flex align-items-center" style={{marginRight: "10px"}} >Limit: </span>
                <select value={limit} onChange={handleLimitChange} className="form-select">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    
                </select>
            </div>
        </div>

        <Sorting />
      </div>

      <div className="row mt-4">
        <div className="container col-2">
          {onFilter && <Filter />} 
        </div>
        <div className={`container ${onFilter ? "col-10" : "col-12"}`}>           
              <div className="result_list" style={{minHeight: "1000px"}}>
                <Result posts={posts} />
              </div>
              
              <Pagination totalPages={totalPages}/>         
        </div>
      </div>
    </div>
  )
}



export default Browse