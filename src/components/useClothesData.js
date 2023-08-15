import { useState, useEffect } from "react"

function useClothesData() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [totalData, setTotalData] = useState([])
  const [cartItems, setCartItems] = useState([])
  
  useEffect(() => {
    async function fetchClothes() {
      try {
        let menCategory = "men%27s%20clothing";
        let womenCategory = "women%27s%20clothing";

        let menClothes = await fetch(`https://fakestoreapi.com/products/category/${menCategory}`)
        .then(res => res.json())

        let womenClothes = await fetch(`https://fakestoreapi.com/products/category/${womenCategory}`)
        .then(res => res.json())

        setTotalData([...menClothes, ...womenClothes])
        let updatedMen = menClothes.map(x => {
          let newData = {...x, count: 1}
          return newData
        })

        let updatedWomen = womenClothes.map(x => {
          let newData = {...x, count: 1}
          return newData
        })

        setTotalData([...updatedMen, ...updatedWomen])

      }
      catch(err) {
        setError(err)
      }
      finally{
        setLoading(false)
      }
    }
    fetchClothes()
  }, [])

  function addOrSub(id, op) {
    let index = totalData.findIndex(d => d.id === id)
    if(op === '+') {
      let add = [...totalData]
      add[index] = {...add[index], count: add[index].count + 1}
      setTotalData(add)
    }
    else {
      let sub = [...totalData]
      sub[index] = {...sub[index], count: sub[index].count - 1}
      setTotalData(sub)
    }
  }

  function handleChange(e, id) {
    let index = totalData.findIndex(item => item.id === id)
    let shallowData = [...totalData]
    shallowData[index] = {...shallowData[index], count: Number(e.target.value)}
    setTotalData(shallowData)
  }

  function addToCart(item) {
    let index = cartItems.findIndex(x => x.id === item.id)
    if(index >= 0) {
      let copy = [...cartItems]
      copy[index].count = copy[index].count + item.count
      setCartItems(copy)
      return
    }  
    setCartItems(cartItems.concat(item))
  }

  function remove(id) {
    let filterCartItems = cartItems.filter(item => item.id !== id)
    setCartItems(filterCartItems)
  }

  return {totalData, loading, error, addOrSub, handleChange, addToCart, cartItems, remove}

}

export default useClothesData