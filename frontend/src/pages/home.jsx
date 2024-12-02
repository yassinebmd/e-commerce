import { Container, Grid ,Box} from '@mui/material'
import MediaCard from '../components/productsCard'
import { useEffect, useState } from 'react'

export const Homepage = () => {

    const [products,setProducts] = useState([])
    const [error,setError] = useState(false)

    useEffect(()=>{
        const fetchfun =async () =>{
            try {
                const response = await fetch('http://localhost:5001/products');
                const data = await response.json()
                setProducts(data)
                
            }catch{
                setError(true)
            }
            
        } 
        fetchfun()
    },[]);
    if (error){
        return <Box sx={{mt:4}}>something wrong !!</Box>
    }
    return(
        <Container sx={{mt:2}}>
            <Grid container spacing={2}>
               
                {products.map((e,i)=>
                    <Grid key={i} item md={4}><MediaCard {...e} /></Grid>
                )}
            </Grid>
        </Container>
    )
}