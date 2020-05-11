import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            //Creating a new array instead of mutating the state (concat) PUSH WOULD MUTATE THE EXISTING STATE
            return state.concat(comment);
        default:
            return state;
      }
};