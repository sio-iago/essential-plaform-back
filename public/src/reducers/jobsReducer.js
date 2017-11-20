// Initial state
export const initialState = {
    jobs: [],
    job: null,
    jobLabel: '',
    jobFilePath: '',
    jobError: false,
    jobLoading: false,

    proteinInfo: {},
    toggleProteinInfoModal: false,
};

// Enum for job actions
export const JOB_ACTIONS = {
    INITIAL_STATE: 'JOB_INITIAL_STATE',

    UPDATE_JOB_LABEL: 'UPDATE_JOB_LABEL',
    UPDATE_JOB_FILEPATH: 'UPDATE_JOB_FILEPATH',

    LOADING_JOBS: 'LOADING_JOBS',
    JOBS_LOADED: 'JOBS_LOADED',
    JOBS_ERROR: 'JOBS_ERROR',

    LOADING_JOB: 'LOADING_JOB',
    JOB_LOADED: 'JOB_LOADED',
    JOB_ERROR: 'JOB_ERROR',

    START_JOB: 'START_JOB',

    PROTEIN_INFO: 'PROTEIN_INFO',
    CLOSE_PROTEIN_MODAL: 'CLOSE_PROTEIN_MODAL',
};

const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
        case JOB_ACTIONS.INITIAL_STATE:
            return initialState;

        case JOB_ACTIONS.UPDATE_JOB_LABEL:
            return {...state, jobLabel: action.value};
        case JOB_ACTIONS.UPDATE_JOB_FILEPATH:
            return {...state, jobFilePath: action.value};

        case JOB_ACTIONS.LOADING_JOBS:
            return {...state, jobError: false, jobs: []};
        case JOB_ACTIONS.JOBS_LOADED:
            return {...state, jobs: action.value, jobError: false};

        case JOB_ACTIONS.LOADING_JOB:
            return {...state, jobError: false, job: null, jobLoading: true};
        case JOB_ACTIONS.JOB_LOADED:
            return {...state, job: action.value, jobError: false, jobLoading: false};

        case JOB_ACTIONS.PROTEIN_INFO:
            return {...state, proteinInfo: action.value, toggleProteinInfoModal: true};
        case JOB_ACTIONS.CLOSE_PROTEIN_MODAL:
            return {...state, proteinInfo: {}, toggleProteinInfoModal: false};

        case JOB_ACTIONS.JOB_ERROR:
        case JOB_ACTIONS.JOBS_ERROR:
            return {...state, jobError: true};

        default:
            return state;
    }
};

export default jobsReducer;