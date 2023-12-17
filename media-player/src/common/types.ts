export interface AuthURLProps {
    authURL: string
}

export interface AuthCodeProps {
    code: string
}

export interface SearchParams {
    code: string | null
}

export interface PlayerProps {
    accessToken: string | undefined,
    trackUri: string | undefined
}

export interface GestureControlProps {
    accessToken: string | undefined
}

export interface SongSearchResult {
    artist: string,
    title: string,
    uri: string,
    albumUrl: string,
    isPlaylist: boolean
}

export interface Track {
    track: SongSearchResult,
    key: string,
    chooseTrack(track: SongSearchResult): void,
    addToQueue(track: SongSearchResult): void
}

export enum GestureLabels {
    Play = 'Play',
    Pause = 'Pause',
    IncreaseVolume = 'Inc_Vol',
    Mute = 'Mute',
    DecreaseVolume = 'Dec_Vol',
    Knuckles = 'Spud',
    PreviousSong = 'Prev_Song',
    NextSong = 'Next_Song'
}

export enum VolumeLevels {
    Muted = -1,
    Low = 10,
    MediumLow = 25,
    Medium = 50,
    MediumHigh = 75,
    High = 100
}

export interface InstructionStep {
    title: string,
    description: string,
    imgPath: string,
    imgWidth: string,
    imgHeight: string,
    imgAlt: string
}

export type InstructionSteps = Array<InstructionStep>

export interface QueueArray {
    [index: number]: number
}

export interface FrequencyMap {
    [index: number | string]: number
}

export interface EndpointURIs {
    LOGIN: string,
    REFRESH: string,
    SEARCH_TRACK: string,
    ADD_TO_QUEUE: string,
    GET_PLAYLISTS: string
}