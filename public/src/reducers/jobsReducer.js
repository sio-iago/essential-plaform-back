// Initial state
export const initialState = {
    jobs: [],
    jobLabel: '',
    jobFilePath: '',
    jobError: false,
};

// Enum for job actions
export const JOB_ACTIONS = {
    INITIAL_STATE: 'JOB_INITIAL_STATE',
    
    UPDATE_JOB_LABEL: 'UPDATE_JOB_LABEL',
    UPDATE_JOB_FILEPATH: 'UPDATE_JOB_FILEPATH',

    LOADING_JOBS: 'LOADING_JOBS',
    JOBS_LOADED: 'JOBS_LOADED',
    JOBS_ERROR: 'JOBS_ERROR',
   
    START_JOB: 'START_JOB',    
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOB_ACTIONS.INITIAL_STATE:
      return initialState;

    case JOB_ACTIONS.UPDATE_JOB_LABEL:
      return {...state, jobLabel : action.value};
    case JOB_ACTIONS.UPDATE_JOB_FILEPATH:
      return {...state, jobFilePath : action.value};

    case JOB_ACTIONS.LOADING_JOBS:
      return {...state, jobError : false, jobs: []};
    case JOB_ACTIONS.JOBS_LOADED:
      return {...state, jobs: action.value, jobError: false};
    
    case JOB_ACTIONS.JOBS_ERROR:
      return {...state, jobError: true};

    default:
      return state;
  }
};

export default jobsReducer;