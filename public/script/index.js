console.log('index.js is incorporated')

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

console.log($('.single-card-container'));
Array.from($('.single-card-container')).forEach(singleCardContainer=>{
    singleCardContainer.addEventListener('click',(e)=>{
        const thisID = singleCardContainer.id;
        movieClicked(thisID)
        console.log(singleCardContainer.id)
    })
})

function movieClicked(containerID) {
    const svgContainerID = 'image-hover-'+containerID
    if (selectedMovies.includes(containerID))//perform deselection
        {
            $(`#${svgContainerID}`).css('top','-350px')
            $(`#${svgContainerID} #ok-svg`).css('scale','1')
            $(`#${svgContainerID} #ok-right`).css('fill','green')
            selectedMovies.pop(containerID);
        }
    else// perform selection
        {
            $(`#${svgContainerID}`).css('top','0')
            $(`#${svgContainerID} #ok-svg`).css('scale','.4')
            $(`#${svgContainerID} #ok-right`).css('fill','white')
            selectedMovies.push(containerID);
        }
}

const selectedMovies = [];