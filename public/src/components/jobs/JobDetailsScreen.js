// React
import React, {Component} from 'react';

// Redux actions
import {connect} from 'react-redux';

// Main application class
import ApplicationScreen from './../application/ApplicationScreen';

// Bootstrap Classes
import {Row, Col, Button, Modal} from 'react-bootstrap';

// Reducers
import {JOB_ACTIONS} from './../../reducers/jobsReducer';

// FA Icons
import 'font-awesome/css/font-awesome.min.css';

const FontAwesome = require('react-fontawesome');

// API Methods
const api = require('../../api/endpoints');


class JobDetailsScreen extends Component {

    constructor(props) {
        super(props);

        this.loadJob(this.props.match.params.id);
    }

    loadJob = (jobId) => {
        this.props.dispatch({type: JOB_ACTIONS.LOADING_JOB})

        api
            .getJob(jobId)
            .then(result => {
                this.props.dispatch({
                    type: JOB_ACTIONS.JOB_LOADED,
                    value: result.body,
                });
            })
            .catch(err => this.props.dispatch({type: JOB_ACTIONS.JOB_ERROR}));
    };

    modalForProtein = degId => {
        api
            .getFastaAnnotationInfo(degId)
            .then(result => this.props.dispatch({
                type: JOB_ACTIONS.PROTEIN_INFO,
                value: result.body,
            }));
    };

    closeProteinInfoModal = () => {
        this.props.dispatch({
            type: JOB_ACTIONS.CLOSE_PROTEIN_MODAL,
        })
    };

    getGoBackButton = () => {
        return (
            <Button bsStyle="default" onClick={() => this.props.history.goBack()}>
                <FontAwesome name="arrow-left"></FontAwesome> Back
            </Button>
        );
    };

    getUpdateButton = () => {
        return (
            <Button bsStyle="info" onClick={() => this.loadJob(this.props.match.params.id)}>
                <FontAwesome name="refresh"></FontAwesome> Refresh
            </Button>
        );
    };

    getDownloadDataButton = () => {
        return (
            <Button bsStyle="success" onClick={() => this.performDownload()}>
                <FontAwesome name="download"></FontAwesome> Download Output
            </Button>
        )
    };

    performDownload = () => {
        const donwloadUrl = api.downloadResultUrl(this.props.match.params.id);
        window.open(donwloadUrl, 'blank');
    };

    renderJobLineItem = (item, references) => {
        return (
            references[item] ?
                <a className='proteinLink' href={references[item]} target='_blank'>{item}</a> :
                <a className='proteinLink'
                      href='javascript:void(0)'
                      onClick={() => this.modalForProtein(item)}>{item}</a>
        );
    };

    renderJobDetailLine = (line, keyIndex, references) => {
        return (
            <Col xs={12} key={keyIndex} className='proteinColumn'>
                {line.map(v => this.renderJobLineItem(v, references))}
            </Col>
        );
    };

    renderJob = () => {
        if (this.props.jobError) {
            return <p>Error loading job. Please try again by pressing the refresh button above.</p>;
        }
        else if (this.props.job === null || this.props.jobLoading) {
            return <p>Loading job details....</p>;
        }
        else {
            const references = this.props.job.references.reduce((obj, curr) => Object.assign(obj, curr), {});
            return <p>
                <h3>OrthoMCL Output Groups</h3>
                <br/>
                <Row>
                    {
                        Array.isArray(this.props.job.groups) && this.props.job.groups.length > 0 ?
                            this.props.job.groups.map((v, i) => this.renderJobDetailLine(v, i, references)) :
                            <Col xs={12}>No output results for your query.</Col>
                    }
                </Row>
            </p>;
        }
    };

    render() {
        return (
            <ApplicationScreen {...this.props}>
                <h1>Job # {this.props.match.params.id}</h1>

                <Modal show={this.props.toggleProteinInfoModal} onHide={this.closeProteinInfoModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Protein Details</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h4>Organism</h4>
                        <p>{this.props.proteinInfo.organism}</p>

                        <h4>DEG ID</h4>
                        <p>{this.props.proteinInfo.degId}</p>

                        <h4>Gene Reference</h4>
                        <p>{this.props.proteinInfo.geneRef}</p>

                        <h4>Gene Name</h4>
                        <p>{this.props.proteinInfo.geneName}</p>

                        <h4>Function</h4>
                        <p>{this.props.proteinInfo.degFunction}</p>
                    </Modal.Body>
                </Modal>

                <hr/>
                <p>
                    {this.getGoBackButton()}
                    <span> </span>
                    {this.getUpdateButton()}
                    <span> </span>
                    {this.getDownloadDataButton()}
                </p>
                <hr/>

                <p>
                    {this.renderJob()}
                </p>
            </ApplicationScreen>
        );
    };

}

const mapStateToProps = (state, ownProps) => ({
    username: state.userReducer.username,
    token: state.userReducer.token,
    job: state.jobsReducer.job,
    jobLoading: state.jobsReducer.jobLoading,
    jobError: state.jobsReducer.jobError,

    proteinInfo: state.jobsReducer.proteinInfo,
    toggleProteinInfoModal: state.jobsReducer.toggleProteinInfoModal,
});

export default connect(mapStateToProps, null)(JobDetailsScreen);
