import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { InstructionStep } from '../../common/types';

export default function InstructionCard(props: InstructionStep) {
  const instructionTitle: string = props.title
  const instructionDescription: string = props.description
  const instructionImg: string = props.imgPath
  const instructionImgWidth: string = props.imgWidth
  const instructionImgHeight: string = props.imgHeight
  const instructionImgAlt: string = props.imgAlt

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width={instructionImgWidth}
          height={instructionImgHeight}
          image={instructionImg}
          alt={instructionImgAlt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {instructionTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {instructionDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}