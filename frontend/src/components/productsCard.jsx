import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line react/prop-types
export default function MediaCard({price,title,image}) {
  return (
    <Card >
      <CardMedia
        sx={{ height: 200 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {price} DH
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' size="small">Add to card</Button>
      </CardActions>
    </Card>
  );
}
