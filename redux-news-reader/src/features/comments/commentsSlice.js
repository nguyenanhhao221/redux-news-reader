// Import createAsyncThunk and createSlice here.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
    'comments/loadCommentsForArticleId',
    async (articleId) => {
        const response = await fetch(`api/articles/${articleId}/comments`);
        const json = await response.json();
        return json;
    }
);
// Create postCommentForArticleId here.
export const postCommentForArticleId = createAsyncThunk(
    'comments/postCommentForArticleId',
    async ({ articleId, comment }) => {
        const requestBody = JSON.stringify({ comment })
        const options = {
            method: 'POST',
            body: requestBody
        }
        const response = await fetch(`/api/articles/${articleId}/comments`, options);
        const json = await response.json();
        return json
    }
)

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        // Add initial state properties here.
        byArticleId: {},
        isLoadingComments: false,
        failedToLoadComments: false,
        createCommentIsPending: false,
        failedToCreateComments: false
    },
    // Add extraReducers here.
    extraReducers: (builder) => {
        builder
            .addCase(loadCommentsForArticleId.pending, (state) => {
                state.isLoadingComments = true;
                state.failedToLoadComments = false;
            })
            .addCase(loadCommentsForArticleId.fulfilled, (state, action) => {
                state.isLoadingComments = false;
                state.failedToLoadComments = false;
                state.byArticleId[action.payload.articleId] = action.payload.comments;
            })
            .addCase(loadCommentsForArticleId.rejected, (state) => {
                state.isLoadingComments = false;
                state.failedToLoadComments = true;
                state.byArticleId = {};
            })
            //cases for action to create comment
            .addCase(postCommentForArticleId.pending, (state) => {
                state.createCommentIsPending = true;
                state.failedToCreateComments = false;
            })
            .addCase(postCommentForArticleId.fulfilled, (state, action) => {
                state.createCommentIsPending = false;
                state.failedToCreateComments = false;
                state.byArticleId[action.payload.articleId].push(action.payload);
            })
            .addCase(postCommentForArticleId.rejected, (state) => {
                state.createCommentIsPending = false;
                state.failedToCreateComments = true;
            })
    }
});

export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
