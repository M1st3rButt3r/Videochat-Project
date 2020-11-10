var nameHTML = document.getElementById('name')
var tagHTML = document.getElementById('tag')
var friendmenu = document.getElementById('friendmenu')
var requestmenu = document.getElementById('requestmenu')

loadUserPanel(nameHTML, tagHTML)
reloadAllLists()


async function reloadAllLists()
{
    loadRelationsList('friends', 'friendslist', generateFriendsListActionButtons, friendmenu)
    loadRelationsList('requests', 'requestslist', generateRequestsListActionButtons, requestmenu)
    loadRelationsList('requested', 'requestedlist', generateRequestedListActionButtons)
    loadRelationsList('blocks', 'blockslist', generateBlocksListActionButtons)
}