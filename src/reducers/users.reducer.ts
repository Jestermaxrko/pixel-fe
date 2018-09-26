import { UsersState, Action } from '../models/redux.state.model';
import followingModel from '../models/following.model';

const initialState = {
  error: false,
  errorMessage: '',
  users: null,
  loading: false,
};

const loadCurrentFollowings = (users, payload) => {
  if (payload) {
    return payload.followingsInfo.map((item, i) => {
      const { followings } = payload;
      item.status = followings[i].status;
      item.avatar = followings[i].avatar;
      item.nickname = followings[i].nickname;
      item.fullName = followings[i].fullName;
      item.website = followings[i].website;
      item.bio = followings[i].bio;
      item.posts = followings[i].posts;
      item.followingInfoId = item._id;
      item._id = followings[i]._id;
      item.following = true;
      item.followers = followings[i].followers;
      item.followings = followings[i].followings;
      return item;
    });
  }
  return users;
};

const unfollow = (users, payload) => {
  return users.map((item: followingModel) => {
    if (item.followingId === payload) {
      item.following = false;
    }
    return item;
  });
};

const follow = (users, payload) => {
  return users.map((item: any): followingModel => {
    if (item._id === payload.followingId) {
      item.favorite = false;
      item.following = true;
      item.followingId = payload.followingId;
      item.followingInfoId = payload.followingInfoId;
      item.newMessages = payload.newMessages;
      item.status = payload.status;
    }
    return item;
  });
};

export function usersReducer(state: UsersState = initialState, action: Action) {
  switch (action.type) {
    case 'LOAD_CURRENT_FOLLOWINGS':
      return {
        ...state,
        users: loadCurrentFollowings(state.users, action.payload),
      };

    case 'FOLLOW_SUCCESS':
      return {
        ...state,
        error: false,
        errorMessage: null,
        users: follow(state.users, action.payload),
      };

    case 'UNFOLLOW_SUCCESS':
      return {
        ...state,
        error: false,
        errorMessage: null,
        users: unfollow(state.users, action.payload),
      };

    case 'CLEAN_USERS_ARRAY':
      return initialState;

    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        error: false,
        errorMessage: null,
        users: [...state.users, action.payload],
        loading: false,
      };

    case 'USERS_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'USERS_ERR':
      return {
        ...state,
        error: true,
        errorMessage: action.payload.response.data.error,
      };

    default:
      return state;
  }
}
