var currentMenu = null
var menuData = -1;

//activates / deactivates the menu  
const toggleMenu = command => {
    currentMenu.style.display = command === "show" ? "block" : "none";
};

//sets the position of the menu
const setPosition = ({ top, left }) => {
    currentMenu.style.left = `${left}px`;
    currentMenu.style.top = `${top}px`;
    toggleMenu("show");
};

//activates the menu on right click
function activateMenu(menu)
{
    if(currentMenu)
    {
        toggleMenu("hide");
        currentMenu = null
    }
    if(menu)
    {
        currentMenu = menu
        const origin = {
            left: event.pageX,
            top: event.pageY
        };
        setPosition(origin);
    }

}

window.addEventListener("click", e => {
    if(currentMenu)
    {
        toggleMenu("hide");
        currentMenu = null
    }
  menuData = -1
});
