// import React, { useState, useEffect, useMemo } from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

// import { GLOBALTYPES } from '../redux/actions/globalTypes'



// import {VscListSelection} from 'react-icons/vsc'
// import useQuery from '../hook/useQuery'
// import Pagination from '../components/Browse/Pagination'


// import { Rating } from '@mui/material'

// import Avatar from '../components/Avatar'

// const BrowseUser = () => {
//   const searchBottom = [
//     {label: 'Employees', path: '/browseUser'},
//     {label: 'Jobs', path: '/browseJobs'}
//   ]
  
//   const [users, setUsers] = useState([])
//   const [keyword, setKeyword] = useState('')
  

//   const [limit, setLimit] = useState(5)
//   const [page, setPage] =  useState(1)
//   const [sort, setSort] = useState('')

  
//   const [onSelection, setOnSelection] = useState(false)
 
//   // const { auth, homePosts }  = useSelector(state => state)
//   const dispatch = useDispatch()

//   const {data} = useQuery(`/api/users?username[regex]=${keyword}&sort=${sort}&page=${page}&limit=${limit}`)
//   useEffect(() => {
//     if(data?.users) setUsers(data.users)
//   }, [data?.users])

  
//   const totalPages = useMemo(() => {
//     if (data?.result < limit) return 1
    
//     if (!data?.total) return 0

//     return Math.ceil(data.total / limit)
    

//   }, [data?.result, data?.total, limit])


//   useEffect(() => {
//     if (onSelection) {
//       dispatch({type: GLOBALTYPES.MODAL, payload: true})
//     } else {
//       dispatch({type: GLOBALTYPES.MODAL, payload: false})
//     }
//   }, [dispatch, onSelection])

//   const handleLimitChange = (e) => {
//     setLimit(e.target.value) 
//     setPage(1)
//   }
//   return (
//     <section className="browse-container">
//       <div className="browse">      
//         <div className="breadcrumb"></div>
//         <div className="search-bar">

//           <div className="search-header">
//             <h3>Browse</h3>
//           </div>

//           <div className="search-body">
            
//             <div className="sorting">
//               <div className="sorting_header"><h5>Sort By: </h5></div>
//               <select className="form-select" value={sort} onChange={e =>  setSort(e.target.value)}>
//                   <option value="">Default</option>
//                   <option value="username">Sort A to Z</option>
//                   <option value="-username">Sort Z to A</option>
//               </select>

//             </div>

//             <div className="list_selection" onClick={() => setOnSelection(true)}>
//               <VscListSelection/>
//             </div>
//             {
//               onSelection && 
//               <div className="filter_sort">
      
//                 <div className="filter_sort_user_container">
//                   <button className="btn btn-danger btn_close"
//                     onClick={() => setOnSelection(false)}>
//                         Close
//                   </button>
//                   <div className="sorting">
//                     <div className="sorting_header"><h5>Sort By: </h5></div>
//                     <select className="form-select" value={sort} onChange={e =>  setSort(e.target.value)}>
//                         <option value="">Default</option>
//                         <option value="title">Sort A to Z</option>
//                         <option value="-title">Sort Z to A</option>
//                     </select>

//                   </div>
//                 </div>

                

//               </div>
//             }

//           </div>
          
//           <div className="search-footer">
//             <nav className="navbar navbar-expand-sm">
//                   <div className="container"> 
//                       <ul className="navbar-nav flex-row mb-0">
//                           {   
//                               searchBottom.map((link, index) => (
//                                   <li className="nav-item" key={index}>
//                                       <Link className="nav-link" to={link.path}>
//                                           {link.label}
//                                       </Link>
                                      
//                                   </li>
//                               ))
//                           }
//                       </ul>
//                   </div>
//               </nav>
//           </div>
//         </div>
//       </div>

//       <div className="search-container">
//         <div className="search-content-container">
//           <div className="search-content">

//             <div className="result-container">
//               <div className="result-header">
//                 <div className="limit" >
//                   <span style={{marginRight: "10px"}}>Limit: </span>
//                   <select value={limit} onChange={handleLimitChange} className="form-select">
//                       <option defaultValue="5">5</option>
//                       <option value="10">10</option>
//                       <option value="20">20</option>
//                       <option value="50">50</option>
                      
//                   </select>

//                 </div>
//                 <Pagination totalPages={totalPages} page={page} setPage={setPage} limit={limit}/>
                
//               </div>
              
//               <div className="result-list" style={{minHeight: "1600px"}}>
//                 {
//                   users.map(user => (
//                     <div key={user._id} className="result-card">
//                       <Link to={`/profile/${user._id}`} className ="text-dark">
//                         <div className="card my-3">
//                           <div className="card_body">
//                               <div className="card_body-content">
//                                 <div className="d-flex">
//                                   <Avatar src={user.avatar} size="big-avatar" />
//                                   <div className="ms-3">
//                                     <h5 className="title">{user.username}</h5> 
//                                     <p>@{user.fullname}</p>
//                                   </div>
//                                 </div>
//                                 <p>Description: 
//                                   {
//                                       user.description.length < 180  
//                                       ? user.description 
//                                       : user.description.slice(0, 180) + '...'
//                                   }
//                                 </p>
//                                 <p className="d-flex"><Rating name="read-only" value={user.rating} precision={0.5} readOnly/>({user.rating})</p>

                                  

                                  
//                               </div>
//                           </div>
//                         </div>
//                       </Link>
//                       <hr style={{margin: '20px 0'}}></hr>
//                     </div>
//                   ))
                
//                 }
//               </div>
//               <Pagination totalPages={totalPages} page={page} setPage={setPage} limit={limit}/>
                            
//             </div>
//           </div>
//         </div>
//       </div>

//     </section>
//   )
// }

// export default BrowseUser