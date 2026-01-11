
import { DummyBlogs } from '../components/DummyBlogs'
import axios from 'axios'


const DummyPost = () => {
    const seedBlogs = async () => {
        try{
            console.log('click')
            for(const blog of DummyBlogs){
                console.log('enter')
                const res = await axios.post('http://127.0.0.1:8000/blog/create', blog)
            
            console.log(res)
            }
        }
        catch(err){
            console.error(err);
        }
    }
  return (
<>
    <button onClick={seedBlogs} className='btn btn-danger'> post </button>
    </>
  )
}

export default DummyPost