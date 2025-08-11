import { useCallback, useRef, useState } from 'react'
import { useBookSearch } from './useBookSearch'
import useDebounce  from './useDebounce'

function App() {

  const [query,setQuery] = useState('')
  const [pageNumber,setPageNumber] = useState(1)
  const debouncedSearchTerm = useDebounce(query,300)
  const {books,loading,error,hasMore} = useBookSearch(debouncedSearchTerm,pageNumber)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setQuery(e.currentTarget.value);
    setPageNumber(1)
  }

  const observer = useRef<IntersectionObserver | null>(null);

  const lastBookElementRef = useCallback((node:any)=> {
    //While loading, if the user scrolls a little and triggers the observer again, it might cause multiple setPageNumber calls, leading to:

    // Duplicate requests.

    // Skipped or duplicate results.

    // Inconsistent state. hence this line is important
    if(loading) return;

    // disconnect the observer from the previous observer so that the new observer gets hooked correctly.
    if(observer.current) observer.current.disconnect(); 

    // here entries, which is only ever a single value for us, comes into the view, ie. isIntersecting
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        console.log("visible");
        setPageNumber(prev => prev + 1)
      }
    })

    if(node) observer.current.observe(node)
    console.log(node);
  },[loading,hasMore])
  
  return (
    <>
     <input type="text" value={query} onChange={handleSearch} className='border-2 border-black' />
     {books.map((book,index) => {
      if(index + 1 === books.length){
        return  <div ref={lastBookElementRef} key={book}>{book}</div>
      }
      return <div key={book}>{book}</div>
     })}
       {loading && <div>Loading..</div>}
     {error && <div>Error..</div>}
    </>
  )
}

export default App
