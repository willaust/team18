window.addEventListener('load', () => {

    const uname = sessionStorage.getItem('NAME');
    
    document.getElementById('aname').innerHTML = uname;
    

})