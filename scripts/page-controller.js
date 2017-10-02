/* ------------- HEADER ---------------*/

const liNames = {Home: "Home", PubMan: "Publication Manager",
				 Profile: "Edit Profile", Logout: "Logout"};	// This is the menu items

const header = document.createElement("HEADER");
const div_container = document.createElement("DIV");

const menu_bar = document.createElement("INPUT");
const menu_title_bar = document.createElement("LABEL");
const h1_menu_bar = document.createElement("H1");

const menu = document.createElement("NAV");
const ul = document.createElement("UL");

/* *   Header Menu   *  */
document.body.appendChild(header);

div_container.setAttribute("class", "contenedor");
header.appendChild(div_container);

menu_bar.setAttribute("type", "checkbox");
menu_bar.setAttribute("id", "menu-bar");
div_container.appendChild(menu_bar);

menu_title_bar.setAttribute("id", "menu-title-bar")
menu_title_bar.setAttribute("for", "menu-bar");
div_container.appendChild(menu_title_bar);

h1_menu_bar.innerText = "Menu";
menu_title_bar.appendChild(h1_menu_bar);

menu.setAttribute("class", "menu");
div_container.appendChild(menu);

for(i in liNames) {
	const li = document.createElement("LI");
	const a = document.createElement("A");
	a.setAttribute("href", "");
	a.setAttribute("id", "btn" + i);
	a.innerText = liNames[i];	
	li.appendChild(a);
	ul.appendChild(li);
}

menu.appendChild(ul);
/* end HEADER */

/* -------------- FOOTER ------------- */

const footer = document.createElement("FOOTER");
const p_footer = document.createElement("P");

p_footer.innerHTML = "This is the footer";

footer.appendChild(p_footer);
document.body.appendChild(footer);
/* end FOOTER */


/* ----- Button events ------ */

// Get elements
var btnLogout = document.getElementById('btnLogout');
var btnProfile = document.getElementById('btnProfile');
var btnPubMan = document.getElementById('btnPubMan');
var btnHome = document.getElementById('btnHome');

// Log out button
btnLogout.addEventListener('click', function(e) {
	firebase.auth().signOut();
});

// Profile
btnProfile.addEventListener('click', function(e) {
	alert("Building zone!");
});

// Publication Manager
btnPubMan.addEventListener('click', function(e) {
	btnPubMan.href = "publication_manager.html";
});

// Home 
btnHome.addEventListener('click', function(e) {
	btnHome.href = "information.html";
});
/* end Button events */