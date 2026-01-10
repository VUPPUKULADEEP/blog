import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import './indCard.css'

export default function IndCard({data, edit}) {
  const navigate = useNavigate();
  return (
    <>
    <Card  id='card' sx={{ maxWidth: 745 }} style={{cursor : 'pointer'}} className="card shadow-lg">
      
      <CardContent >
        <Box display="flex" justifyContent="space-between" alignItems="center" onClick={() => {navigate(`/blog/${data.blog_id}`)}}>
          <Typography gutterBottom variant="h6" component="div" >
          {data.title}
        </Typography>
        {edit&&<EditIcon onClick={()=>{navigate(`/blog/edit/${data.blog_id}`)}} className='d-flex flex-column justify-content-end'/>}
        </Box>
        {console.log(data)}
        <Typography variant="body2" sx={{ color: 'text.secondary' }} >
          {data?.description?.[0]?.data?.text.slice(0,49)+'...'}
        </Typography>
      </CardContent>
    </Card>
    
</>
  );
}
