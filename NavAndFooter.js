// const searchbtn = document.getElementById("searchbtn");

document.getElementById("searchbtn").addEventListener('click', function(event){
    event.preventDefault();

    if(searchBar.style.display == 'none'){
        DisplaySearchBar(event);
    }
    else{
        hideSearchBar(event);
    }
});

var searchBar = document.getElementById("searchBar");



function DisplaySearchBar(event){
    
    event.preventDefault();
    searchBar.style.display = 'block';
    // return true;
}

function hideSearchBar(event){
    event.preventDefault();

    searchBar.style.display = 'none';
}

// -----------------------------------------

var navbar = document.getElementById("navbar");

document.getElementById("menubtn").addEventListener('click', function(event){
    event.preventDefault();

    DisplayNavBar(event);
    if(DisplayNavBar(event)){
        hideNavBar(event);
    }

});



function DisplayNavBar(event){
    event.preventDefault();

    navbar.style.display = 'block';
    // return true;
}

function hideNavBar(event){
    event.preventDefault();

    navbar.style.display = 'none';
}