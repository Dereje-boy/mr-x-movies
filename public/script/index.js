console.log('index.js is incorporated')

// checkbox-show-more

const thumbnail_input = document.getElementById('thumbnail_input')
const thumbnail_preview = document.getElementById('thumbnail_preview');

$("#checkbox-show-more").on('change',(e)=>{
    // console.log(e.target.innerHTML);
    $('.show-more').toggleClass('d-flex d-none')
})

thumbnail_input.addEventListener('change',function (e){
    // console.log('rendering the image')
    const file = thumbnail_input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            thumbnail_preview.src = event.target.result;
            $('.preview-image').removeClass('d-none');
            $('.preview-image').addClass('d-flex');
            thumbnail_input.scrollIntoView({behavior:'smooth'})
        };
        reader.readAsDataURL(file);
    }
})
