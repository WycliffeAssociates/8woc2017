import React from 'react';
import styled, {keyframes} from 'styled-components';
import img1 from '../mockupdata/img1.PNG';
import {zoomIn} from "react-animations";


export default class ProjectCard extends React.Component {


    reviewProject = () => {
      const {projectId, getChapters, history, bookName, mode } = this.props;
      getChapters(projectId, history);

      const modeCap = mode.charAt(0).toUpperCase() + mode.slice(1);
      history.push({
        pathname: './chapters',
        search: `?projectId=${projectId}&&bookName=${bookName}&&mode=${modeCap}`,
      });
    };

    render() {
      const { bookName, version, dateModified, language, txt } = this.props;





      return (
        <Card onClick={this.reviewProject}>
          <InformationContainer >
            <TextContainer>
              <BookText> <i class="material-icons">book</i> {bookName} </BookText>
              <Text><i class="material-icons">translate</i> {language}</Text>
              <Text><i class="material-icons">description</i> {version}</Text>
              <Text><i class="material-icons">access_time</i> {dateModified}</Text>

            </TextContainer>
            <ImageIndicatorContainer>
              <div></div>
              <ImageContainer>
                <Image src={img1} alt="Smiley face" height="10vw" width="10vw" />
              </ImageContainer>

            </ImageIndicatorContainer>

          </InformationContainer>

          <ButtonContainer>
            <ReviewButton> <i class="material-icons">done_all</i> {txt.review} </ReviewButton>

          </ButtonContainer>
        </Card>

      );
    }

}



const zoomInAnimation = keyframes `${zoomIn}`;

const Card= styled.div`
    text-align: center;
    height: 15vw;
    min-height: 233px;
    width: 26vw;
    min-width: 350px;
    border-radius: .5vw;
    box-shadow: 0px 1px 2px 4px rgba(0,0,0,0.2);
    overflow: hidden;
    background-color: white;
    margin: 0 0 3vw 4vw;
    animation: ${zoomInAnimation} .2s ease-in;
    cursor: pointer;
`;
Card.displayName = 'Card';

const Image = styled.img`
   height: 9.5vw;
   width: 13.5vw;
`;
Image.displayName = 'Image';

const BookText= styled.p`
   font-size: 1.5vw
   font-weight: bold;
`;
BookText.displayName = 'BookText';

const Text = styled.p`
   font-size: 1vw
   color: #606060;
`;
Text.displayName = 'Text';

const InformationContainer = styled.div`
    display:flex;
    flex-direction: row;
    height: 82%;
`;
InformationContainer.displayName = 'InformationContainer';

const ImageIndicatorContainer = styled.div`
  width: 50;
`;
ImageIndicatorContainer.displayName = 'ImageIndicatorContainer';

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 2vw;
`;
ImageContainer.displayName = 'ImageContainer';

const TextContainer = styled.div`
  padding-top: .5vw;
  padding-left: .7vw;
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
TextContainer.displayName = 'TextContainer';

const ReviewButton = styled.button`

    i {
      vertical-align: middle;
    }
    color: #fff;
    border: none;
    height: 4vh;
    width: inherit;
    background-color: #009CFF;
    cursor: pointer;
    font-size: 1.1vw; //in the font awesome library the font size ends up controlling the size of the icon
  `;
ReviewButton.displayName = 'ReviewButton';

const ButtonContainer= styled.div`

    background: #009CFF;
    width: 100%;
    min-height: 40px;
    padding: 0.25vw;
    overflow: hidden;
    text-align: center;
    border-color: white;
    border-width: 1vw;
  `;
ButtonContainer.displayName = 'ButtonContainer';
