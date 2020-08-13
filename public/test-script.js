console.log("Here we are")

const header =$('header.site-header').parent();

header.prepend('<div>Hello this is coming from pbulic folder</div>').css({'background-color': 'orange', 'text-align': 'center'})
