import React, { useEffect } from 'react'
import { useState } from "react"
import './pagination.css'
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";

const Pagination = () => {

  // state to hold all fetched data
  const [data, setdata] = useState([])

  // state to hold the current page number (starting from 0)
  const [pagenumber, setpagenumber] = useState(0)

  // how many items you want to show on one page
  const page_size = 10;

  // fetch data from API
  const getdata = async () => {
    const dataAPI = await fetch("https://dummyjson.com/products?limit=194"); // fetch 194 products
    const json = await dataAPI.json();
    setdata(json.products) // store products into state
  }

  // fetch data only once when component mounts
  useEffect(() => {
    getdata()
  }, [])

  // total number of items
  const pages = data.length;

  // calculate total number of pages based on page size
  const pageNumbers = Math.ceil(pages / page_size);

  // calculate start & end index for slicing the data
  const start = pagenumber * page_size;
  const end = start + page_size

  // when user clicks on a page number
  const clickToChang = (e) => {
    setpagenumber(e) // set current page
  }

  // go to previous page
  const prevpage = () => {
    setpagenumber((prev) => prev - 1)
  }

  // go to next page
  const nextpage = () => {
    setpagenumber((prev) => prev + 1)
  }

  return (
    <div className='parent' >

      {/* pagination buttons */}
      <div className="numberOfpages">
        {/* Prev button - disabled when on first page */}
        <button onClick={prevpage} disabled={pagenumber === 0} >
          <IoMdArrowDropleftCircle />
        </button>

        {/* Page numbers */}
        {[...Array(pageNumbers).keys().map((e) => (
          <button
            key={e} // unique key for React
            onClick={() => clickToChang(e)} // change page on click
            className={"p" + (e === pagenumber ? " color" : "")} // add "color" class if this page is active
          >
            {e}
          </button>
        ))]}

        {/* Next button - disabled when on last page */}
        <button
          onClick={() => nextpage()}
          disabled={pagenumber === pageNumbers - 1}
        >
          <IoMdArrowDroprightCircle />
        </button>
      </div>

      {/* Data display section */}
      <div className="child">
        {
          data.slice(start, end).map((item) => (
            <div key={item} className='child_2' >
              <p>{item.id}</p>
              <img
                src={item.images}
                alt={item.title}
                className='imges'
              />
              <p>{item.brand}</p>
              <h4> Price = {item.price}</h4>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Pagination
