import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'


const Pagination = React.memo(({totalPages, limit}) => {

  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    limit: 2,
  })
  const pageCurr = parseInt(searchParams.get('page') ? searchParams.get('page') : 1)
  const [page, setPage] = useState(pageCurr)

  
  const { firstArr, lastArr } = useMemo(() => {
    const newArr = [...Array(totalPages)].map((_, i) => i + 1)

    if(totalPages < 4)
      return {
        firstArr: newArr,
        lastArr: []
      }

    if(totalPages - page >= 4){
      return {
        firstArr: newArr.slice(page - 1, page + 2),
        lastArr: newArr.slice(totalPages - 1)
      }
    }else{
      return {
        firstArr: newArr.slice(totalPages - 4, totalPages),
        lastArr: []
      }
    }
  }, [totalPages, page])

  const prev = () => {
    const newPage = Math.max(page - 1, 1)
    setPage(newPage)
    searchParams.set('page', newPage)
    setSearchParams(searchParams, {replace: true})
  }

  const next = () => {
    const newPage = Math.min(page + 1, totalPages)
    setPage(newPage)
    searchParams.set('page', newPage)
    setSearchParams(searchParams, {replace: true})
  }

  const jump = (num) => {
    setPage(num)
    searchParams.set('page', num)
    setSearchParams(searchParams, {replace: true})
  }

  const isActive = (index) => {
    if(index === page) return "active"
    return ""
  }

  return (
    <div className='pagination'>

      <button onClick={prev}>&laquo;</button>
      {
        firstArr.map(num => (
          <button key={num} className={`${isActive(num)}`}
          onClick={() => jump(num)}>
            {num}
          </button>
        ))
      }

      { lastArr.length > 0 && <button>...</button> }
      
      {
        lastArr.map(num => (
          <button key={num} className={`${isActive(num)}`}
          onClick={() => jump(num)}>
            {num}
          </button>
        ))
      }

      <button onClick={next}>&raquo;</button>
    </div>
  )
})

export default Pagination