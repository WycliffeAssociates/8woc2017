/**
 * Created by DennisMarchuk on 7/27/2017.
 */

import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
let state;
let handleOpen;
let handleClose;
let disable;

export default class DownloadTR extends Component{
    state = { modalOpen: false };

    handleOpen = (e) => this.setState({
        modalOpen: true,
    });

    handleClose = (e) => this.setState({
        modalOpen: false,
    });

    // called when the user clicks yes inside the modal
    publishFiles () {
        this.props.onPublish()
        this.handleClose()
    }

    checkReadyForPublish() {
        var counter = 0;
        this.props.chapters.map((i) => {
            if (i.is_publish) {counter+=1}
        });

        return counter > 0;
    }

    rtnTrue(){
        return true
    }

    rtnFalse(){
        return false
    }
    render() {
        let readyForPublish = this.checkReadyForPublish();
        let publishButton =
            <Button
                floated="right"
                color={"blue"}
                disabled={!this.props.isPublish ? this.rtnTrue() : this.rtnFalse()}//enable if pusblished is true

            >
               Download </Button>


        return (
            //download published projects as .tr files















            <Button/>
            {/*<Modal*/}
                {/*trigger={publishButton}*/}
                {/*open={this.state.modalOpen}*/}
                {/*onClose={this.handleClose}*/}
                {/*closeIcon='close'*/}
                {/*size='small'*/}

            {/*>*/}
                {/*<Header icon='browser' content='Publish Project' />*/}
                {/*<Modal.Content>*/}
                    {/*<h3>Are you ready to publish this project?</h3>*/}
                {/*</Modal.Content>*/}
                {/*<Modal.Actions>*/}
                    {/*<Button color='green' onClick={this.publishFiles.bind(this)} inverted>*/}
                        {/*<Icon name='checkmark' />Yes*/}
                    {/*</Button>*/}
                {/*</Modal.Actions>*/}
            {/*</Modal>*/}
        )
    }
}








{/*<Button*/}
{/*disabled={false}*/}
{/*floated="right"*/}
{/*color="red"*/}
    {/*>*/}

    {/*Download</Button>*/}







//
//
// export default class PublishButton extends Component {
//     state = { modalOpen: false };
//
//     handleOpen = (e) => this.setState({
//         modalOpen: true,
//     });
//
//     handleClose = (e) => this.setState({
//         modalOpen: false,
//     });
//
//     // called when the user clicks yes inside the modal
//     publishFiles () {
//         this.props.onPublish()
//         this.handleClose()
//     }
//
//     checkReadyForPublish() {
//         var counter = 0;
//         this.props.chapters.map((i) => {
//             if (i.is_publish) {counter+=1}
//         });
//
//         return counter > 0;
//     }
//
//     render() {
//         let readyForPublish = this.checkReadyForPublish();
//
//         let publishButton =
//             <Button onClick={this.handleOpen}
//                     floated="right"
//                     disabled={!readyForPublish || this.props.isPublish}
//                     color={this.props.isPublish ? "green" : ""}
//             >
//                 {this.props.isPublish ? "Published" : "Publish"}
//             </Button>;
//
//         return (
//             <Modal
//                 trigger={publishButton}
//                 open={this.state.modalOpen}
//                 onClose={this.handleClose}
//                 closeIcon='close'
//                 size='small'
//
//             >
//                 <Header icon='browser' content='Publish Project' />
//                 <Modal.Content>
//                     <h3>Are you ready to publish this project?</h3>
//                 </Modal.Content>
//                 <Modal.Actions>
//                     <Button color='green' onClick={this.publishFiles.bind(this)} inverted>
//                         <Icon name='checkmark' />Yes
//                     </Button>
//                 </Modal.Actions>
//             </Modal>
//         )
//     }
// }