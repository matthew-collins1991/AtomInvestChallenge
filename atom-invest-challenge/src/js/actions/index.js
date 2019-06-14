
import * as actionTypes from "../constants/action-types";

export function deletePost(id) {
  return { type: actionTypes.DELETE_POST, id };
}

export function fetchPosts(payload) {
    return { type: actionTypes.FETCH_POSTS, payload };
  }