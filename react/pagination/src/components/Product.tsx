import './Product.css'

type ProductType = {
  id: number,
  title: string,
  category: string,
  image: string,
  description: string,
  price: number,
  rating: number
}

const Product = ({product}: {product: ProductType}) => {
  return (
    <div className='container'>
      <h2 className='product-title'>{product.title}</h2>
      <img className='product-image' src={product.image} alt="Image" />
      <div className='product-details'>
        <p>{product.description}</p>
        <p>{product.category}</p>
        <p><span>{product.price}</span> <span>{product.rating}</span></p>
      </div>

    </div>
  )
}

export default Product
