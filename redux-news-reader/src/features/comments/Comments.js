import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadCommentsForArticleId,
    selectComments,
    isLoadingComments,
} from '../comments/commentsSlice';
import { selectCurrentArticle } from '../currentArticle/currentArticleSlice';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

const Comments = () => {
    const dispatch = useDispatch();
    const currentArticle = useSelector(selectCurrentArticle);
    // Declare additional selected data here.
    const comments = useSelector(selectComments);
    const commentsAreLoading = isLoadingComments;

    // Dispatch loadCommentsForArticleId with useEffect here.
    useEffect(() => {
        dispatch(loadCommentsForArticleId(currentArticle.id))
    }, [currentArticle, comments, dispatch]);


    if (commentsAreLoading) return <div>Loading Comments</div>;
    if (!currentArticle) return null;

    return (
        <div className='comments-container'>
            <h3 className='comments-title'>Comments</h3>
            <CommentList comments={comments} />
            <CommentForm articleId={currentArticle.id} />
        </div>
    );
};

export default Comments;
