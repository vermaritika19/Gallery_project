import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card';

const App = () => {

  const [userData, setUserData] = useState([]);

  const [index, setIndex] = useState(1)

  const getData = async() =>{
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=12s`)
    setUserData(response.data)
  }

  useEffect(function(){
    getData()
  }, [index])

  let printUserData = <h3 className='text-gray-400 text-lg absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Loading.......</h3>

  if(userData.length>0){
    printUserData = userData.map(function(elem,idx){
      return(
        <div key={idx}>
         <Card  elem = {elem} />
        </div>
      )
    })
  }


  return (
    <div className='bg-black h-screen p-4 overflow-auto text-white'>
      {/* <h1 className='fixed text-6xl'>{index}</h1> */}
      <div className='flex  flex-wrap gap-4 p-5'>
        {printUserData}
      </div>

      <div className='flex  justify-center gap-6 items-center p-4'>
      <button 
         style={{opacity: index == 1 ? 0.5 : 1 }}
         onClick={() => {
          console.log('prev btn clicked')
          if(index>1){
            setIndex(index-1)
            setUserData([])
          } 
         }}
         className='bg-blue-500 text-sm text-white cursor-pointer active:scale-95 rounded px-4 py-2 font-semibold'>
         Prev
        </button>
        <h4>Page {index}</h4>
        <button 
         onClick={() => {
          console.log('next btn clicked')
          setIndex(index+1)
          setUserData([])
         }}
         className='bg-blue-500 text-sm text-white cursor-pointer active:scale-97 rounded px-4 py-2 font-semibold'>
         Next
        </button>
      </div> 
    </div>
  )
}

export default App