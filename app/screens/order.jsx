
import { useParams } from 'react-router-dom'


export default function Order(){
    const { id } = useParams()
    console.log(id)
    
    return(
        <>
        </>
    )
}