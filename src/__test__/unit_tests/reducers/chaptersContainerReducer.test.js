import ChaptersContainerReducer from '../../../js/reducers/ChaptersContainerReducer';

describe('ChaptersContainerReducer', () => {
    const INITIAL_STATE = {
        error: "",
        chapters: [],
        book: {},
        language: {},
        version: {},
        project_id: -1,
        published: false,
        loaded: false,
        downloadError: "",
        downloadSuccess: "",
        downloadLoading: false,
        downloadLoadingSourceAudio: false,
        downloadErrorAudioSource: "",
        checked_level: -1
    };
    it('should have initial state', () => {
        expect(ChaptersContainerReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('should change state', () => {
        expect(ChaptersContainerReducer({}, { type: "FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS" })).not.toEqual(INITIAL_STATE);
    });

});
