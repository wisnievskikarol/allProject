import React from 'react'
import { AiFillStar } from 'react-icons/ai';
import './GitHubRepoListItem.css'
function ListItem(props) {
    return (
        <div className = "GitHubRepoListItem_itemList"> 
            <div className = "GitHubRepoListItem_textSection">
                <p className = "GitHubRepoListItem_itemTitle">{props.item.name}</p><br/>
                <p className = "GitHubRepoListItem_itemDescription">{props.item.description ==  null ? "No description" : props.item.description }</p>
            </div>
            
            <div className = "GitHubRepoListItem_starsSection">
                <AiFillStar></AiFillStar>
                <p  >{props.item.stargazers_count}</p>
            </div>            
            
        </div>
    )
}

export default ListItem
