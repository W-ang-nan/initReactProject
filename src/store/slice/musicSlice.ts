import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { useMp3, useVideoTitle, useLyric } from '@/api/api';

interface paramsType {
    id: number,
    quality: string | "standard"
}
export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        musicData: { musicId: 0, musicIndex: 0, musicMp3: "", musicTime: 0, musicoQuality: 'standard', musicLyric: "", isPlay: false, musicLoopType: 1 },
        audioTitle: { songImg: "", songName: "", songTitle: "" },
        // 设置一个队列
        mp3List: <any[]>[],
        download: "",
        loading: false,
        // historySongs: <any>[],
        // likeSongs: <any>[],
        // activeLike: false
    },
    reducers: {
        setMuiscId: (state, action: PayloadAction<number>) => {
            console.log(action);
            state.musicData.musicId = action.payload;
        },
        setMusicQuality: (state, action: PayloadAction<string>) => {
            state.musicData.musicoQuality = action.payload;
        },
        setMusicLoopType: (state, action: PayloadAction<number>) => {
            state.musicData.musicLoopType = action.payload;
            console.log(state.musicData.musicLoopType);
        },
        playMusic: (state, action: PayloadAction<boolean>) => {
            state.musicData.isPlay = action.payload;
            console.log(state.musicData.isPlay);
        },
        setPlaylist: (state, action: PayloadAction<any>) => {
            state.mp3List = action.payload
        },
        isLoop: (state, action) => {
            let index = action.payload.findIndex((item: any) => item.id == state.musicData.musicId)
            if (index >= action.payload.length - 1) {
                index = -1
            }
            state.musicData.musicId = action.payload[index + 1].id
        },
        nextSong: (state) => {
            let index = state.mp3List.findIndex((item: any) => item.id == state.musicData.musicId)
            if (index >= state.mp3List.length - 1) {
                index = -1
            }
            state.musicData.musicId = state.mp3List[index + 1].id
        },
        previousSong: (state) => {
            let index = state.mp3List.findIndex((item: any) => item.id == state.musicData.musicId)
            if (index <= 0) {
                index = state.mp3List.length
            }
            state.musicData.musicId = state.mp3List[index - 1].id
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getMp3Data.pending, (state) => {
                state.loading = true
                console.log("🚀 ~ 进行中！")
            })
            .addCase(getMp3Data.fulfilled, (state, { payload }) => {
                console.log("🚀 ~ fulfilled", payload);
                state.musicData.musicMp3 = payload.data.url
                state.musicData.musicTime = payload.data.time
                state.musicData.musicLyric = payload.LyricData.lrc.lyric
                state.audioTitle.songImg = payload.TitleData.al.picUrl
                state.audioTitle.songTitle = payload.TitleData.name
                state.audioTitle.songName = payload.TitleData.ar[0].name
                state.loading = false
            })
            .addCase(getMp3Data.rejected, (state, err) => {
                console.log("🚀 ~ rejected", err, state)
            });
    }
})

export const getMp3Data = createAsyncThunk('getMp3Data', async (params: paramsType) => {
    let TitleData = await useVideoTitle(params.id);
    let data = await useMp3(params.id, params.quality);
    let LyricData = await useLyric(params.id);
    return {
        data: data,
        TitleData: TitleData,
        LyricData: LyricData
    }
})


// 为每个 case reducer 函数生成 Action creators
export const { setMuiscId, playMusic, setPlaylist, setMusicQuality, setMusicLoopType, isLoop, nextSong, previousSong } = musicSlice.actions;

// selectors 等其他代码可以使用导入的 `RootState` 类型
export const selectCount = (state: RootState) => state.counter.value;

export default musicSlice.reducer;