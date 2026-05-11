let a = document.querySelector(".first")

a.addEventListener("mouseover",function(){
    console.log("you have hovered over the button")
    //on the text will be changed to "you have hovered over the button"
    a.textContent = "you have hovered over the button"
})

a.addEventListener("mouseout",function(){
    console.log("you have left the button")
    //on the text will be changed to "you have left the button"
    a.textContent = "you have left the button"
})