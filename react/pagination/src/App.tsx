import { useEffect, useState } from 'react'
import Product from './components/Product'
import './index.css'

type ProductType = {
  id: number,
  title: string,
  category: string,
  image: string,
  description: string,
  price: number,
  rating: number
}

function App() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [pageNumber, setPageNumber] = useState(0)
  const [totalPages,setTotalPages] = useState(0);
  const [limit, setLimit] = useState(8)// this can be changed

   useEffect(()=> {
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${limit * pageNumber}`).then(res => res.json())
    .then(data =>{
      // console.log(data);
      
      setTotalPages(Math.ceil(data.total/limit))
      const fetchedProducts: ProductType[] = data?.products?.map((p: any) => (
        {
            id: p.id,
            title: p.title,
            category: p.category,
            image: p.images[0],
            description: p.description,
            price: p.price,
            rating: p.rating
        }
      )) || []

        setProducts(fetchedProducts)
      }).catch(err => console.log(err))
      
   },[pageNumber])

   useEffect(()=> {
    console.log(products);
    console.log(totalPages);
    
   },[products])
     

  return (
    <main className='main'>
     <h1>Products</h1>
     <div className='products-container'>
      {products.map((p:ProductType) => <Product key={p.id} product={p}/>)}
     </div>

     {/* setup pagination */}
     <div className='pages'>
      <button 
         onClick={() => setPageNumber(prev => prev - 1)}
      className={`${pageNumber === 0 ? 'hidden' : 'visible'} pages-btn`}> &larr;</button>
      {Array.from({length: totalPages},(_,i) => (
        <button 
        onClick={() => setPageNumber(i)}
        key={i} 
        className={`${pageNumber === i && 'active'} pages-btn`}>{i+1}</button>
      ))}
      <button 
       onClick={() => setPageNumber(prev => prev + 1)}
      className={`${totalPages - pageNumber === 1 ? 'hidden' : 'visible'} pages-btn`}>&rarr;</button>
     </div>
    </main>
  )
}

export default App
