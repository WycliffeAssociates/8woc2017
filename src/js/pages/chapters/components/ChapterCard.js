import React, {Component} from 'react';
import styled from 'styled-components';
import CircularProgressbar from "react-circular-progressbar";
import QueryString from "query-string";



export default class ChapterCard extends Component {

    reviewChapter = () => {
      const {id, getChunks, history, number, getComments, location } = this.props;
      const searchBar = QueryString.parse(location.search);

      getChunks(id);     // chapter id
      getComments(id, 'chapter_id');

      history.push({
        pathname: './kanban',
        search: `?chapterId=${id}&chapterNum=${number}&bookName=${searchBar.bookName}&projectId=${searchBar.projectId}`,
      });


    };

    // componentWillMount(){
    //     const{ total_chunks, uploaded_chunks, upgradeCheckingLevel } = this.props;
    //
    //     if(uploaded_chunks === total_chunks && total_chunks == uploaded_chunks){
    //        // this.props.upgradeCheckingLevel()
    //     }
    //
    // }



    render() {
        const{ number, total_chunks, uploaded_chunks, published_chunks } = this.props;

        let dangerSign = true;
        let checkLevel_1 = false;

        if(uploaded_chunks === total_chunks){     // check if all the chunks uploaded matches wih the total chunks in that chapter
            dangerSign = false;
        }



        const chunksCompleted = `${published_chunks}/${uploaded_chunks}`;
        const percentageCompleted = (published_chunks * 100)/ total_chunks;

        return (

                <Card check ={checkLevel_1}>
                    <InformationContainer >
                        <TextContainer>
                            <P>Chapter {number}</P>
                        </TextContainer>
                        {checkLevel_1 ?
                            <CheckTextContainer>
                                <CheckText>Level 1</CheckText>
                            </CheckTextContainer>
                            :
                            ''
                        }

                    </InformationContainer>



                        {checkLevel_1 ?
                            <CircularProgressContainer check ={checkLevel_1}>

                                <i style={{fontSize: '9vw'}} class="material-icons">star_border</i>

                            </CircularProgressContainer>
                            :
                            <CircularProgressContainer>
                            <CircularTextContainer>
                                <CircularText>{chunksCompleted}</CircularText>
                            </CircularTextContainer>
                            <CircularProgressbar
                                percentage={percentageCompleted}
                                textForPercentage={null}
                            />
                            </CircularProgressContainer>
                        }



                    <ButtonContainer>
                        <ReviewButton check={checkLevel_1} onClick={this.reviewChapter}> <i class="material-icons">done_all</i> Review </ReviewButton>
                    </ButtonContainer>
                </Card>


        );
    }

}







const Card= styled.div`
    color: ${props=> props.check ? 'white': ''}
    text-align: center;
    height: 22vw;
    width: 17vw;
    border-radius: .5vw;
    box-shadow: 0px 1px 2px 4px rgba(0,0,0,0.2);
    overflow: hidden;
    background-color: white;
    background: ${props => props.check ? 'linear-gradient(to bottom, #0076FF, #00C5FF)':''};
    margin-top: 3vw;
    
`;

const CircularTextContainer = styled.div`
    position: absolute;
`;

const CircularText = styled.p`
    font-size: 1.5vw;
`;

const CheckText = styled.p`
    font-size: 1vw;
`;

const ReviewButton= styled.button`
  border-radius: 20px;
  color: ${props=> props.check ? '#009CFF': 'white'};
  background: linear-gradient(to bottom,${props => props.check ? '#FFF, #FFF': '#0076FF, #00C5FF'} );
  padding: 0.4vw 4vw;
  font-size: 1.1vw;
  font-weight: 100;
  border: none;
  text-decoration: underline;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  outline:none;
  cursor: pointer;
`;

const CircularProgressContainer = styled.div`
    display: flex;
    justify-content:center;
    height: ${props=> props.check ? '68%': '75%'}
    align-items:center;
    flex-direction: column;
    position: relative;
    
`;

const CheckTextContainer = styled.div`
    width:100%;
    display: flex;
    justify-content: flex-start;
    padding-left: 1vw;
`;


const P = styled.p`
   font-size: 1.2vw
   font-weight: bold;
`;

const InformationContainer = styled.div`
`;


const TextContainer = styled.div`
  padding-top: .5vw;
  padding-left: .7vw;
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;


`;

const ButtonContainer= styled.div`
    width: inherit;
    overflow: hidden;
    text-align: center;
    border-color: white;
    border-width: 1vw;
  `;
