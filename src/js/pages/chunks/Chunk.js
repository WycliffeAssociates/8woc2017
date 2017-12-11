import React, { Component } from "react";
import ChunkPropTypes from "./ChunkPropTypes";
import { Accordion, Icon, Grid } from "semantic-ui-react";
import TakeTable from "../takes/TakeTable";
import "css/takes.css";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getAudioTakes, getChunkIdClicked } from './../../actions';

import ChunkSidebar from "../takes/components/SideBar";
class Chunk extends Component {

	constructor(props) {
		super(props);
    	this.state = {
			calledChunks: [],
			chunkId:''
		};
	}


getTakes(chunkId) {
  let counter = this.props.takes.length;

debugger;
	let {calledChunks, tksCounter} = this.state
			if(!calledChunks.includes(chunkId)){                 // once you click a chunk, checks if the chunk has not been clicked before
					this.props.getChunkIdClicked(chunkId);
					this.props.getAudioTakes(chunkId, counter);               // if it has not been clicked we call api and add the chunk id to the list of chunks clicked
																													// so next time clicked to close it won't call the api
				  this.setState({
					calledChunks: [...this.state.calledChunks, chunkId]

				})
		}

}

	render() {
		let publish = [];
		let onestar = [];
		let twostar = [];
		let threestar =[];

		var counter = 0;
		let orderedTakes = this.props.takes;

   	//console.log(this.props.takes)

			orderedTakes.map(tk => {
				   const test = this.props.chunkIdClicked;
					 debugger;
					if(this.props.chunkIdClicked === tk.chunkId){   // get takes corresponding just to the selected chunk
						counter += 1;
					 tk.order = counter;
					 if (tk.published) {
						 publish[publish.length] = tk;
						  debugger;
					 } else if (tk.rating < 2) {
						 onestar[onestar.length] = tk;
						 debugger;
					 } else if (tk.rating === 2) {
						 twostar[twostar.length] = tk;
						  debugger;
					 } else if (tk.rating === 3) {
						 threestar[threestar.length] = tk;
						  debugger;
					 }
					}




//console.log(threestar);


			});
		var modeLabel = "";
		switch (this.props.mode) {
			case "chunk":
				modeLabel = this.props.displayText.chunk;
				break;
			case "verse":
				modeLabel = this.props.displayText.verse;
				break;
			default:
				modeLabel = this.props.displayText.segment;
		}
		var icon1 = <Icon name="star" color="red" size="big" />;
		var icon2 = (
			<div>
				<Icon name="star" color="yellow" size="big" />
				<Icon name="star" color="yellow" size="big" />
			</div>
		);
		var icon3 = (
			<div>
				<Icon name="star" color="green" size="big" />
				<Icon name="star" color="green" size="big" />
				<Icon name="star" color="green" size="big" />
			</div>
		);
		var icon4 = <Icon name="check" color="pink" size="big" />;
		return (
			<div>
				<Accordion fluid styled >
					<Accordion.Title className="ChunkTitle" onClick={(itempProps)=> this.getTakes(this.props.chunkId, itempProps)} >
						<center>
							<Icon name="dropdown" />
							<font color="black">
								{modeLabel} {this.props.number}
								{/* {this.props.comments.length > 0
									? <Icon name="circle" color="yellow" />
									: ""} */}
							</font>
						</center>
					</Accordion.Title>
					<Accordion.Content className="ChunkBody">
						<Grid fluid columns={2}>
							<Grid.Column width={15}>
								<Grid fixed padded fluid columns={4}>
									<TakeTable
										icon={icon1}
										mode={this.props.mode}
										addToListenList={this.props.addToListenList}
										patchTake={this.props.patchTake}
										deleteTake={this.props.deleteTake}
										updateChosenTakeForChunk={
											this.props.updateChosenTakeForChunk
										}
										onClickSave={this.props.onClickSave}
										column={0}
										orderedTakes={onestar}
										chunkNumber={this.props.number}
										deleteComment={this.props.deleteComment}
										deleteButton={true}
										active={this.props.active}
										chunkId={this.props.id}
									/>
									<TakeTable
										icon={icon2}
										mode={this.props.mode}
										addToListenList={this.props.addToListenList}
										patchTake={this.props.patchTake}
										deleteTake={this.props.deleteTake}
										updateChosenTakeForChunk={
											this.props.updateChosenTakeForChunk
										}
										onClickSave={this.props.onClickSave}
										column={1}
										orderedTakes={twostar}
										chunkNumber={this.props.number}
										deleteComment={this.props.deleteComment}
										active={this.props.active}
										chunkId={this.props.id}
									/>
									<TakeTable
										icon={icon3}
										mode={this.props.mode}
										addToListenList={this.props.addToListenList}
										patchTake={this.props.patchTake}
										deleteTake={this.props.deleteTake}
										updateChosenTakeForChunk={
											this.props.updateChosenTakeForChunk
										}
										onClickSave={this.props.onClickSave}
										column={2}
										orderedTakes={threestar}
										chunkNumber={this.props.number}
										deleteComment={this.props.deleteComment}
										active={this.props.active}
										chunkId={this.props.id}
									/>
									<TakeTable
										icon={icon4}
										mode={this.props.mode}
										addToListenList={this.props.addToListenList}
										patchTake={this.props.patchTake}
										deleteTake={this.props.deleteTake}
										updateChosenTakeForChunk={
											this.props.updateChosenTakeForChunk
										}
										onClickSave={this.props.onClickSave}
										column={3}
										orderedTakes={publish}
										chunkNumber={this.props.number}
										deleteComment={this.props.deleteComment}
										active={this.props.active}
										chunkId={this.props.id}
									/>
								</Grid>
							</Grid.Column>
							<Grid.Column width={1} verticalAlign="middle" floated="right">
								<ChunkSidebar
									comments={this.props.comments}
									onClickSave={this.props.onClickSave}
									column={0}
									orderedTakes={onestar}
									chunkNumber={this.props.number}
									mode={this.props.mode}
									chunkId={this.props.id}
									deleteComment={this.props.deleteComment}
									active={this.props.active}
									onSourceClicked={this.props.onSourceClicked}
								/>
							</Grid.Column>
						</Grid>
						<br />
					</Accordion.Content>
				</Accordion>
			</div>
		);
	}
}
Chunk.propTypes = {
	chunk: ChunkPropTypes
};

const mapStateToProps = state => {
	const {  takes, update, chunkIdClicked } = state.chunkListContainer;
	return { takes, update, chunkIdClicked };
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{	getAudioTakes,
			getChunkIdClicked
		}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Chunk);
