import { RECEIVE_TWEETS } from '../actions/tweets'
import {TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'

 
export default function tweets(state = {}, action){
    switch(action.type){
        case RECEIVE_TWEETS:
            return{
                ...state,
                ...action.tweets
            }
        case TOGGLE_TWEET:
            return{
                ...state,
                [action.id]:{
                    ...state[action.id],
                    likes: action.hasLiked === true ? 
                    state[action.id].likes.filter((id)=> id !== action.authedUser):
                    state[action.id].likes.concat([action.authedUser])
                    }
                } 
        case ADD_TWEET:
            const { tweet } = action
            let replyingTo = {}
            if(tweet.replyingTo){
                replyingTo = {
                    [tweet.replyingTo]:{
                       ...state[tweet.replyingTo],
                       replies: [tweet.replyingTo].replies.concat([tweet.id])
                    }
                }
            }
            return{
                ...state,
                [action.tweet.id]: action.tweet,
                replyingTo
            }        
        default:
            return state    
    }
}