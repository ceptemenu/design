function togglePassSee(){
    var input = $('.password input');
    var type = input.attr("type");
    $('.password-see').toggleClass('active');
    if(type == "password"){
        input.attr("type","text");
    }else{
        input.attr("type","password");
    }
}