import { PostState } from '../models/posts-state.model';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { Action } from '../models/action.model';

const initialState: PostState = {
  error: false,
  errorMessage: '',
  successMessage: '',
  currentSessionPosts: [],
  wasLoadedFirstTime: false,
  isLoading: false,
};

const getFeedLinePosts = (followings: User[]): Post[] => {
  let feedLinePosts: Post[] = [];
  followings.map((item: User): void => {
    const arr = item.posts.map((selecyerItem: Post): Post => {
      selecyerItem.type = 'feed';
      return selecyerItem;
    });

    feedLinePosts = [...feedLinePosts, ...arr];
    return null;
  });

  feedLinePosts = feedLinePosts.sort((a: Post, b: Post): number => b.timestamp - a.timestamp);
  return feedLinePosts;
};

export function postsReducer(state: PostState = initialState, action: Action) {
  switch (action.type) {
    case 'START_POST_PROCESSING':
      return {
        ...state,
        error: false,
        isLoading: true,
      };

    case 'POST_ADD_SUCCESS':
      return {
        ...state,
        error: false,
        errorMessage: '',
        successMessage: 'Post added',
        currentSessionPosts: [action.payload, ...state.currentSessionPosts],
        isLoading: false,
      };

    case 'POST_ADD_ERROR':
    case 'LIKES_CHANGED_ERROR':
    case 'COMMENT_ADDED_ERROR':
      return {
        ...state,
        error: true,
        errorMessage: action.payload.response.data.error,
        successMessage: '',
        isLoading: false,
      };

    case 'CREATE_SESSION_POSTS':
      return {
        ...state,
        wasLoadedFirstTime: true,
        currentSessionPosts: [...action.payload.posts.reverse(), ...getFeedLinePosts(action.payload.followings)],
      };

    case 'LIKES_CHANGED_SUCCESS':
      const indexLikes: number = state.currentSessionPosts.findIndex((item: Post): boolean => item._id === action.payload._id);
      const newLikedPosts: Post[]  = [...state.currentSessionPosts];
      newLikedPosts[indexLikes].likes =  action.payload.likes;
      return {
        ...state,
        error: false,
        errorMessage: '',
        currentSessionPosts: [...newLikedPosts],
      };

    case 'COMMENT_ADDED_SUCCESS':
      const indexComments: number = state.currentSessionPosts.findIndex((item: Post): boolean => item._id === action.payload._id);
      const newCommentedPosts: Post[] = [...state.currentSessionPosts];
      newCommentedPosts[indexComments].comments =  action.payload.comments;
      return {
        ...state,
        error: false,
        errorMessage: '',
        currentSessionPosts: [...newCommentedPosts],
      };
    case 'ADD_POST_TO_SESSION':
      const postsToAdd: Post[] = action.payload.filter((item: Post): boolean => {
        return state.currentSessionPosts.findIndex((el: Post): boolean => el._id === item._id) < 0;
      });
      return {
        ...state,
        error: false,
        errorMessage: '',
        currentSessionPosts: [...state.currentSessionPosts, ...postsToAdd],
      };

    case 'ADD_POSTS_TO_FEEDLINE':
      return {
        ...state,
        error: false,
        errorMessage: '',
        currentSessionPosts: [...state.currentSessionPosts.map((item: Post): Post => {
          if (item.author._id === action.payload) { item.type = 'feed'; }
          return item;
        })],
      };

    case 'REMOVE_POSTS_FROM_FEEDLINE':
      return {
        ...state,
        error: false,
        errorMessage: '',
        currentSessionPosts: [...state.currentSessionPosts.filter((item: Post): Post => {
          if (item.author._id === action.payload) { item.type = ''; }
          return item;
        })],
      };

    case 'POST_REMOVE_SUCCESS':
      return {
        ...state,
        error: false,
        errorMessage: '',
        currentSessionPosts: [...state.currentSessionPosts.map((item: Post): Post => {
          if (item._id === action.payload) { item.deleted = true; }
          return item;
        })],
        isLoading: false,
      };

    case 'CLEAR_ALL_POSTS':
      return initialState;

    default: return state;
  }
}
