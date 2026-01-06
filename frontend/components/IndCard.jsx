import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function IndCard({data}) {
  return (
    <>
    <Card sx={{ maxWidth: 845 }} className="card shadow-lg">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {data.description}
        </Typography>
      </CardContent>
    </Card>
    
</>
  );
}
