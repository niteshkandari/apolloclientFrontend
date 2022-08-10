import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CardActionArea } from "@mui/material";


const MUICard = (props) => {
    const { cardData, onClick, handleEdit } = props;
  return (
    <>
      <Card sx={{ width: 250,height: 280}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image="https://graphql.org/img/og-image.png"
            alt="recipe"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {cardData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cardData.description}  
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <EditIcon onClick={handleEdit}/>
            </IconButton>
            <IconButton aria-label="delete" onClick={onClick}>
            <DeleteIcon/>
            </IconButton>
          </CardActions>
        </CardActionArea>
      </Card>
    </>
  );
};

export default MUICard;
